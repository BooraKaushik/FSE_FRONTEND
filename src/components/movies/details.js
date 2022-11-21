import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  //https://www.omdbapi.com/?i=tt11651768&apikey=852159f0
  const { imdbID } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=852159f0`)
      .then((response) => response.json())
      .then((movie) => setMovie(movie));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h1>{movie.Title}</h1>
      <p>
        <img
          src={movie.Poster}
          height={100}
          className="float-start"
          alt={movie.Poster}
        />
        {movie.Plot}
      </p>
    </>
  );
};
export default MovieDetails;
