import {useEffect} from "react";
import {Search} from "../components/search";
import "./App.scss";
import {searchMoviesClear, searchMoviesRequest} from "../redux/actions/search";
import {useDispatch, useSelector} from "react-redux";
import {getGenreRequest} from "../redux/actions/genres";
import {Card} from "../components/card/Card";
import {Genre} from "../components/genre/Genre";
import {apiClient} from "../api";
import {GetSearchResponse} from "../api/model";

function App() {
    const dispatch = useDispatch();
    const {data, noResult} = useSelector((state: any) => state.search);
    const genresList = useSelector((state: any) => state.genres.data);


    function onSearch(value: string) {
        if (value.length >= 3) {
            dispatch(searchMoviesRequest(value));
        } else if (data.length) {
            dispatch(searchMoviesClear());
        }
    }

    useEffect(() => {
        dispatch(getGenreRequest());
    }, []);

    function renderGenres(genre_ids: string[], genresList: object[]) {
        const genres: any[] = genre_ids.map((genreId: any) => genresList.find((item: any) => {
            return item.id === genreId
        }));

        console.log(genres)
        return genres.map(((genre: any) => <Genre name={genre.name}></Genre>))
    }

    function getYear(year: string) {
        if (year) {
            return new Date(year).getFullYear().toString();
        } else {
            return 'Unknown'
        }
    }

    async function handleCardClick(id: number) {

        const movie = await apiClient.getMovie(id);
        console.log(movie);
    }

    function renderCards(data: GetSearchResponse[]) {
        if (noResult) {
            return (<div>
                <p>No result</p>
            </div>)
        }

        return data?.map((data: any) => (
            <Card
                year={getYear(data.release_date)}
                genres={[...renderGenres(data.genre_ids, genresList)]}
                key={data.id}
                poster={`${process.env.REACT_APP_IMAGE_URL}/t/p/w200${data?.poster_path}`}
                title={data?.original_title}
                handleCardClick={() => handleCardClick(data.id)}
            />)
        )
    }

    return (
        <div className={'main-container'}>
            <header className='header'>
                <div className="container">
                    <div className="logo">
                        <img src="/images/attrecto_logo.png " alt=""/>
                        <div className="title">Attrecto</div>
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    <Search onInputEnd={onSearch} timeout={800}/>
                </div>
                <div className="search-result">
                    {renderCards(data)}
                </div>
            </main>
        </div>
    );
}

export default App;
