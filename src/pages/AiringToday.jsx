import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAiringToday from "../hooks/useAiringToday";

const AiringToday = () => {
  const {
    navigate,
    tvShows,
    loadingInitial,
    loadingMore,
    handleLoadMore,
    formatDate,
    getScoreColor,
  } = useAiringToday();

  const TvCard = ({ show }) => {
    const score = Math.round(show.vote_average * 10);
    const posterUrl = show.poster_path
      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    return (
      <div
        onClick={() => navigate(`/tv/${show.id}`)}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 relative cursor-pointer"
      >
        {/* Poster */}
        <div className="h-[250px] w-full overflow-hidden">
          <img
            src={posterUrl}
            alt={show.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Score */}
        <div className="absolute bottom-20 left-4 z-10">
          <div
            className="w-[50px] h-[50px] rounded-full bg-[#081c22] border-[3px] flex items-center justify-center font-bold text-xs"
            style={{ borderColor: getScoreColor(score) }}
          >
            <span style={{ color: getScoreColor(score) }}>{score}%</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pt-6">
          <h3 className="text-base font-semibold text-gray-800 leading-tight line-clamp-2">
            {show.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatDate(show.first_air_date)}
          </p>
        </div>
      </div>
    );
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="h-[270px]">
        <Skeleton height={270} />
      </div>
      <div className="p-4">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="50%" />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        Airing Today
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[280px] flex-shrink-0 space-y-4">
          <div className="bg-white flex items-center justify-between p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="font-semibold text-gray-800 text-base">Sort</p>
            <MdArrowForwardIos className="text-gray-500" />
          </div>

          <div className="bg-white flex items-center justify-between p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="font-semibold text-gray-800 text-base">
              Where To Watch
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 text-gray-600 text-sm font-medium px-2 py-1 rounded-full">
                73
              </span>
              <MdArrowForwardIos className="text-gray-500" />
            </div>
          </div>

          <div className="bg-white flex items-center justify-between p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="font-semibold text-gray-800 text-base">Filters</p>
            <MdArrowForwardIos className="text-gray-500" />
          </div>

          <button className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition-transform">
            Search
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1">
          <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {loadingInitial
              ? Array(8)
                  .fill()
                  .map((_, i) => <SkeletonCard key={i} />)
              : tvShows.map((show) => <TvCard key={show.id} show={show} />)}

            {loadingMore &&
              Array(8)
                .fill()
                .map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
          </div>

          {!loadingInitial && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className={`px-10 py-3 rounded-lg font-semibold uppercase tracking-wide shadow-md transition-all duration-300 ${
                  loadingMore
                    ? "opacity-70 cursor-not-allowed bg-gradient-to-r from-cyan-400 to-green-400"
                    : "bg-gradient-to-r from-cyan-500 to-green-500 hover:shadow-lg hover:-translate-y-1"
                } text-white`}
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

export default AiringToday;
