export interface GetMovieResponse {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: object,
    budget: number,
    genres: object[],
    homepage: string
    id: number|string,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: object[],
    production_countries: object[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: object[],
    status: string,
    tagline:  string,
    title:  string,
    video:  boolean,
    vote_average: number,
    vote_count: number,
}

export interface Result {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    media_type: string,
    original_language: string,
    original_title: string
    overview: string,
    popularity: string,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface GetSearchResponse {
    page: number,
    results: Result[],
    total_pages: number,
    total_results: number
}

export interface Genre {
    id: number,
    name: string
}

export interface GetGenresResponse {
    genres: Genre[]
}
