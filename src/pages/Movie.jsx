import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import useMovie from "../hooks/useMovie";

const Movie = () => {
  const navigate = useNavigate();
  const {
    allMovies,
    loadingInitial,
    handleLoadMore,
    formatDate,
    getScoreColor,
  } = useMovie();

  const MovieCard = ({ movie }) => {
    const score = Math.round(movie.vote_average * 10);
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    return (
      <div
        onClick={() => navigate(`/movie/${movie.id}`)}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative"
      >
        {/* Poster */}
        <div className="w-full h-[250px] overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Score */}
        <div className="absolute bottom-[80px] left-3 z-10">
          <div
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center font-bold text-[12px]"
            style={{
              background: "#081c22",
              border: `3px solid ${getScoreColor(score)}`,
              color: getScoreColor(score),
            }}
          >
            {score}%
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pt-6">
          <h3 className="text-[16px] font-bold text-gray-800 leading-tight line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatDate(movie.release_date)}
          </p>
        </div>
      </div>
    );
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="w-full h-[270px]">
        <Skeleton height={270} />
      </div>
      <div className="p-4">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="50%" />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 md:px-8 py-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-5">
        Popular Movies
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-[280px] flex-shrink-0 space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
            <p className="font-semibold text-gray-800 text-base">Sort</p>
            <MdArrowForwardIos className="text-gray-600" />
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
            <p className="font-semibold text-gray-800 text-base">Where To Watch</p>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                73
              </span>
              <MdArrowForwardIos className="text-gray-600" />
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
            <p className="font-semibold text-gray-800 text-base">Filters</p>
            <MdArrowForwardIos className="text-gray-600" />
          </div>

          <button className="w-full py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] transition-transform">
            Search
          </button>
        </div>

        {/* Main Section */}
        <div className="flex-1 min-w-0">
          {!loadingInitial ? (
            <InfiniteScroll
              dataLength={allMovies.length}
              next={handleLoadMore}
              hasMore={true}
              loader={
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {Array(8)
                    .fill()
                    .map((_, idx) => (
                      <SkeletonCard key={`skeleton-${idx}`} />
                    ))}
                </div>
              }
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {allMovies.map((movie) => (
                  <MovieCard
                    key={`${movie.id}-${movie.release_date}`}
                    movie={movie}
                  />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {Array(8)
                .fill()
                .map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
