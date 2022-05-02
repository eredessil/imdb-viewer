import {GenreProps} from "./model";
import "./genre.scss";

export function Genre ({name}: GenreProps) {
    return <span className='genre'>{name}</span>
}
