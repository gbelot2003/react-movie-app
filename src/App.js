import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSerchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data.Search);
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies(searchTerm);
    }, [])

    return (
        <div className="app">
            <h1>Movie-Land</h1>
            <div className="search">
                <input placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) =>  setSerchTerm(e.target.value) }
                />
                <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) :
                    (
                        <div className="empty">
                            <h2>No moves found</h2>
                        </div>
                    )
            }
        </div>
    )
}

export default App;