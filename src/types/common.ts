export interface IPost {
    categories: number[],
    content: {
        protected: boolean,
        rendered: string,
    },
    date: string,
    date_gmt: string,
    excerpt: {
        protected: boolean,
        rendered: string,
    },
    featured_media: number,
    format: string,
    guid: {
        rendered: string,
    },
    id: number,
    link: string,
    meta: any[],
    modified: string,
    modified_gmt: string,
    ping_status: string,
    slug: string,
    status: string,
    sticky: boolean,
    tags: any[],
    template: string,
    title: {
        rendered: string,
    },
    type: string,
    _embedded: {
        ['wp:featuredmedia']: {
            source_url: string,
        }[]
    }
}

export interface StorageForPosts {
    [key: string]: {
        lastUpdated: number,
        posts: IPost[]
    }
}
