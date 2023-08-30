export interface IConstants {
        theme: 'dark' | 'light',
        cacheTimeout: number,
        socials: {
            github:  string | null | undefined,
            instagram:  string | null | undefined,
            tiktok:  string | null | undefined,
        },
        blogDomain: string,
        categories: {
            general:  { title: string, id: number },
            blogTricks: { title: string, id: number },
            reviews: { title: string, id: number },
            skinCare: { title: string, id: number },
        }
    }