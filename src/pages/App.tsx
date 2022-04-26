import './App.scss';
import {Search} from "../components/search";
import {Api} from "../api";

const api = new Api();
function App() {
    async function onSearch(value: string) {
        if (value.length >= 3) return;
        let data = await api.searchMovies(value);
        console.log(data)
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
                    <div className="search-result-title">

                    </div>

                    <div className="search-result-card-container">
                        <div className="search-result-card">
                            <picture>
                                <source srcSet={"https://via.placeholder.com/60"}/>
                            </picture>
                            <div className="card-title">
                                <h4>Blade Runner</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
