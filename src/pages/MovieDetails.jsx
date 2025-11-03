import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../config";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <div className="text-white text-center py-20 bg-gray-900 text-2xl">
        Loading...
      </div>
    );

  const score = Math.round(movie.vote_average * 10);

  const getScoreColor = (score) => {
    if (score >= 80) return "#21d07a";
    if (score >= 60) return "#d2d531";
    return "#db2360";
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-screen text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Overlay */}
      <div className="bg-gradient-to-r from-[rgba(31,31,31,0.9)] via-[rgba(31,31,31,0.7)] to-[rgba(31,31,31,0.5)] w-full h-full">
        {/* Content Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8 px-6 md:px-10 lg:px-20 py-10">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-[250px] md:w-[300px] rounded-lg shadow-lg"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movie.title}{" "}
              <span className="text-gray-300 font-normal">
                ({movie.release_date?.slice(0, 4)})
              </span>
            </h1>

            {/* Subinfo */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-gray-300 text-sm mt-2 mb-5">
              <span className="border border-gray-400 px-2 py-[2px] rounded text-xs">
                A
              </span>
              <span>
                {new Date(movie.release_date).toLocaleDateString("en-IN")}
              </span>
              <span>• {movie.genres.map((g) => g.name).join(", ")}</span>
              <span>
                • {(movie.runtime / 60).toFixed(0)}h {movie.runtime % 60}m
              </span>
            </div>

            {/* Score, Tagline, Trailer */}
            <div className="flex flex-wrap items-center gap-5 mb-6">
              <div
                className="w-[60px] h-[60px] rounded-full flex items-center justify-center font-bold text-lg"
                style={{
                  background: "#081c22",
                  border: `4px solid ${getScoreColor(score)}`,
                  color: getScoreColor(score),
                }}
              >
                {score}%
              </div>

              {movie.tagline && (
                <div className="italic text-gray-400 text-sm md:text-base">
                  {movie.tagline}
                </div>
              )}

              <button className="bg-sky-500 hover:bg-sky-600 transition-all text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-1">
                ▶ Play Trailer
              </button>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {movie.overview}
              </p>
            </div>

            {/* Credits */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {movie.credits?.crew?.slice(0, 6).map((person) => (
                <div key={person.credit_id} className="w-[140px]">
                  <p className="font-bold text-white text-sm md:text-base">
                    {person.name}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    {person.job}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
