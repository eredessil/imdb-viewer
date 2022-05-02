import {CardProps} from "./model";
import "./card.scss";

export function Card ({poster,title, genres, year, handleCardClick}: CardProps) {
    return (
        <div className='card' onClick={handleCardClick}>
            <div className="year">{year}</div>
            <img src={poster} alt=""/>
            <p>{title}</p>
            <div className='genres'>{genres}</div>
        </div>
    )
}
