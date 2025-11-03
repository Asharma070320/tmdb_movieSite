import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import useNowPlaying from "../hooks/useNowPlaying";

const NowPlayings = () => {
  const navigate = useNavigate();
  const { allNowPlayingMovies, loadingInitial, loadingMore, handleLoadMore } =
    useNowPlaying();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#4CAF50";
    if (score >= 70) return "#FFC107";
    if (score >= 60) return "#FF9800";
    return "#F44336";
  };

  const NowPlayingCard = ({ movie }) => {
    const score = Math.round(movie.vote_average * 10);
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    return (
      <div
        onClick={() => navigate(`/movie/${movie.id}`)}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer relative"
      >
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-20 left-3 z-10">
            <div
              className="w-12 h-12 rounded-full border-4 flex items-center justify-center bg-white text-xs font-bold"
              style={{ borderColor: getScoreColor(score), color: getScoreColor(score) }}
            >
              {score}%
            </div>
          </div>
        </div>

        <div className="p-4 pt-6">
          <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-gray-500 text-sm">{formatDate(movie.release_date)}</p>
        </div>
      </div>
    );
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-64">
        <Skeleton height={256} />
      </div>
      <div className="p-4">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="50%" />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 px-6 md:px-12 py-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Now Playing</h2>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Left Sidebar */}
        <div className="w-full md:w-72 space-y-4">
          {/* Sort */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <p className="font-semibold text-gray-700 text-base">Sort</p>
            <MdArrowForwardIos className="text-gray-500" />
          </div>

          {/* Where to Watch */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <p className="font-semibold text-gray-700 text-base">Where To Watch</p>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                73
              </span>
              <MdArrowForwardIos className="text-gray-500" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <p className="font-semibold text-gray-700 text-base">Filters</p>
            <MdArrowForwardIos className="text-gray-500" />
          </div>

          {/* Search Button */}
          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-full text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition">
            Search
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {loadingInitial
              ? Array(8)
                  .fill()
                  .map((_, idx) => <SkeletonCard key={idx} />)
              : allNowPlayingMovies.map((movie) => (
                  <NowPlayingCard
                    key={`${movie.id}-${movie.release_date}`}
                    movie={movie}
                  />
                ))}

            {loadingMore &&
              Array(8)
                .fill()
                .map((_, idx) => <SkeletonCard key={`skeleton-${idx}`} />)}
          </div>

          {/* Load More Button */}
          {!loadingInitial && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className={`w-full md:w-auto px-10 py-4 rounded-lg font-semibold text-lg text-white uppercase tracking-wider transition-all shadow-lg 
                ${
                  loadingMore
                    ? "bg-gradient-to-r from-sky-400 to-green-300 opacity-70 cursor-not-allowed"
                    : "bg-gradient-to-r from-sky-500 to-green-400 hover:shadow-xl hover:-translate-y-0.5"
                }`}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NowPlayings;
