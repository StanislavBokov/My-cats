export type CatsItem = {
    id: string,
    url: string,
    favorities: boolean,
}

export type CatsState = {
    cats: [
        CatsItem
    ] | [],
    isFavoritePage: boolean,
    loading: boolean,
    loadingNextPage: boolean,
    error: {
        error: boolean,
        errorMessage: string
    }
}
