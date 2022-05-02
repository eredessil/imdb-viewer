import {GetSearchResponse} from "../../api/model";

export interface SearchMoviesRequestAction {
    type: any,
    payload: string
}

export interface SearchMoviesAction {
    type: any,
    payload: GetSearchResponse[]
}
