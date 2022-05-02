import {GetGenresResponse} from "../../api/model";

export interface GenresAction {
    type: any,
    payload: GetGenresResponse[]
}
