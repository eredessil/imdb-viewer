import {useEffect, useState} from "react";
import {Search} from "../components/search";
import "./App.scss";
import {searchMoviesClear, searchMoviesRequest} from "../redux/actions/search";
import {useDispatch, useSelector} from "react-redux";
import {getGenreRequest} from "../redux/actions/genres";
import {Card} from "../components/card/Card";
import {Genre} from "../components/genre/Genre";
import {apiClient} from "../api";
import {GetMovieResponse, GetSearchResponse} from "../api/model";
import Modal from 'react-modal';

interface InitialModalData {
    original_title: string,
    poster_path: string,
    overview: string,
    genres: (string | number)[],
    release_date: string
    imdb_id: number,
    production_countries: object[],
    runtime: number
}

const customStyles = {
    content: {
        background: 'black',
        border: 'none',
        outline: 'none',
        boxShadow: '0 5px 38px rgba(64, 64 64, .04)'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, .84)',
        backdropFilter: 'blur(10px)',
        opacity: 1
    }
};

function App() {
    const initialModalData: InitialModalData | null = null;
    const dispatch = useDispatch();
    const {data, noResult} = useSelector((state: any) => state.search);
    const genresList = useSelector((state: any) => state.genres.data);
    const [modalData, setModalData] = useState<InitialModalData | null>(null)

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
        const movie: any = await apiClient.getMovie(id);
        console.log(movie);
        setModalData(movie);
        openModal(movie)
    }

    function openModal(movie: GetMovieResponse) {
    }

    function renderCards(data: GetSearchResponse[]) {
        if (noResult) {
            return (<p className='no-result'>No result</p>);
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

    function renderModalContent() {
        if (!modalData) return;
        const {
            original_title,
            poster_path,
            overview,
            genres,
            release_date,
            imdb_id,
            production_countries,
            runtime
        } = modalData;

        function getRuntime(runtime: number) {
            const hours = Math.floor(runtime / 60);
            const miutes = runtime % 60;
            return `${hours}h ${miutes}m`;
        }

        return <div>
            <div className="close-modal" onClick={() => setModalData(null)}>X</div>
            <div className="modal-content">
                <div className="poster">
                    <img src={`${process.env.REACT_APP_IMAGE_URL}/t/p/w400${poster_path}`} alt=""/>
                </div>
                <div className="details">
                    <p className='original-title'>{original_title}</p>
                    <p className='overview'>{overview}</p>
                    <p className='release-date'><strong>Release
                        rate</strong>: {new Date(release_date).toLocaleDateString('en-us', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })}</p>
                    <p className='runtime'><strong>Runtime: </strong>{`${runtime} min`} ({getRuntime(runtime)})</p>
                    <p className={'production-countries'}><strong>Production Countries: </strong>
                        {production_countries.map((item: any) => `${item.name} `)}</p>
                    <p><strong>Genres</strong>: {genres?.map((item: any) => <Genre name={item.name}/>)}</p>
                    <a className='imdb-url' href={`https://www.imdb.com/title/${imdb_id}`} target='_blank'>imdb</a>

                </div>

            </div>
        </div>
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
            <Modal style={customStyles}
                   isOpen={!!modalData}
                   onAfterOpen={() => document.body.style.overflow = 'hidden'}
                   onAfterClose={() => document.body.style.overflow = 'unset'}
                   onRequestClose={() => setModalData(null)}
            >{renderModalContent()}</Modal>
        </div>
    );
}

export default App;
