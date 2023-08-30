import { CONSTANTS } from '@/store/constants'
import type { MainStore } from '@/store/main'
import { IPost } from '@/types/common'
import { storage } from '@/utils/storage'

export const getLatestPosts = async ({
    category = '',
    mainStore,
    noCache = false,
    page = 1,
}: {
        category?: string,
        noCache?: boolean,
        mainStore: MainStore,
        page?: number,
    }) => {
    if (!noCache) {
        if (!category) {
            if ((mainStore?.postStorage?.latestPosts && mainStore?.postStorage?.latestPosts?.lastUpdated || 0) > Date.now() - CONSTANTS.cacheTimeout) {
                return { isError: false, error: null, posts: mainStore?.postStorage?.latestPosts?.posts }
            }
        } else {
            if ((mainStore?.postStorage?.[category] && mainStore?.postStorage?.[category]?.lastUpdated || 0) > Date.now() - CONSTANTS.cacheTimeout) {
                return { isError: false, error: null, posts: mainStore?.postStorage?.[category]?.posts }
            }
        }
    }
    const url = `https://${CONSTANTS.blogDomain}/wp-json/wp/v2/posts?${category ? `categories=${category}&` : ''}_embed&page=${page}`
    let res: Response
    try {
        res = await fetch(url)
    } catch (e) {
        if (!category) {
            return { isError: true, error: e, posts: mainStore?.postStorage?.latestPosts?.posts }
        } else {
            return { isError: true, error: e, posts: mainStore?.postStorage?.[category]?.posts }
        }
    }

    if (!res.ok) {
        return { isError: true, error: res.statusText, posts: [] }
    }
    let posts = await res.json()
    console.info('posts', posts)
    posts = posts.map((post: IPost) => {
        post._embedded['wp:featuredmedia'][0].source_url = optimizeGoogleCDNImage(post._embedded['wp:featuredmedia'][0].source_url)
        return post
    })

    if (!noCache) {
        if (!category) {
            mainStore.postStorage.latestPosts = {
                lastUpdated: Date.now(),
                posts,
            }
        } else {
            mainStore.postStorage[category] = {
                lastUpdated: Date.now(),
                posts,
            }
        }
    }
    storage.set('postStorage', JSON.stringify(mainStore.postStorage))
    return { isError: false, error: null, posts }
}

export const optimizeGoogleCDNImage = (url: string, width: number = 500) => {
    try {
        let { origin, pathname } = new URL(url)
        if (!origin.includes('googleusercontent')) return url
        pathname = pathname.split('=').length > 1 ? pathname.split('=')[0] : pathname
        const newUrl = `${origin}${pathname}=w${width}-rw`
        return newUrl
    } catch {
        return url
    }
}
