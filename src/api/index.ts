import {GetGenresResponse, GetMovieResponse, GetSearchResponse} from "./model";

class Api {
    static makeRequest(uri: string, params: object = {}) {
        const searchParams = new URLSearchParams({...params, api_key: `${process.env.REACT_APP_API_KEY}`});
        const url = `${process.env.REACT_APP_API_URL}/${uri}?${searchParams}`;
        return fetch(url).then(response => response.json());
    }

    public searchMovies(query: string) : Promise<GetSearchResponse> {
        return Api.makeRequest(`search/movie`, {query});
    }

    public getMovie(id: number) : Promise<GetMovieResponse> {
        return Api.makeRequest(`movie/${id}`);
    }

    public getGenres() : Promise<GetGenresResponse> {
        return Api.makeRequest('genre/movie/list');
    }
}

const apiClient = new Api();
export {apiClient};
