import {GetGenresResponse, GetMovieResponse} from "./model";

export class Api {
    protected async makeRequest(uri: string, params: object = {}) {
        const searchParams = new URLSearchParams({...params, api_key: `${process.env.REACT_APP_API_KEY}`});
        const url = `${process.env.REACT_APP_API_URL}/${uri}?${searchParams}`;
        return fetch(url).then(response => response.json());
    }

    public async searchMovies(query: string) : Promise<GetMovieResponse> {
        return await this.makeRequest('search/multi', {query});
    }

    public async getMovie(id: string) : Promise<GetMovieResponse> {
        return await this.makeRequest(`movie/${id}`);
    }

    public async getGenres() : Promise<GetGenresResponse> {
        return await this.makeRequest('genre/movie/list');
    }
}

