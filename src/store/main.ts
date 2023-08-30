import { defineStore } from 'pinia'
import type { IPost, StorageForPosts } from '@/types/common'


export const DefaultMainStore = {
    viewPost: null as IPost | null,
    postStorage: {} as StorageForPosts
}

const useMainStore = defineStore('main', {
    state: () => {
        return DefaultMainStore
    }
})

export type MainStore = ReturnType<typeof useMainStore>

export { useMainStore }
