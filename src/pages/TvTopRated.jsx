import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useTvTopRated } from "../hooks/useTvTopRated";

const TvTopRated = () => {
  const navigate = useNavigate();
  const { tvShows, loadingInitial, loadingMore, handleLoadMore } = useTvTopRated();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
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

  const TvCard = ({ show }) => {
    const score = Math.round(show.vote_average * 10);
    const posterUrl = show.poster_path
      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    return (
      <div
        className="relative bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
        onClick={() => navigate(`/tv/${show.id}`)}
      >
        {/* Poster */}
        <div className="w-full h-[250px] overflow-hidden">
          <img
            src={posterUrl}
            alt={show.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Score */}
        <div className="absolute bottom-20 left-4 z-10">
          <div
            className="w-[50px] h-[50px] rounded-full bg-[#081c22] border-4 flex items-center justify-center font-bold text-xs"
            style={{ borderColor: getScoreColor(score), color: getScoreColor(score) }}
          >
            {score}%
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pt-6">
          <h3 className="text-[16px] font-bold text-gray-800 leading-snug line-clamp-2">
            {show.name}
          </h3>
          <p className="text-sm text-gray-500">{formatDate(show.first_air_date)}</p>
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
    <div className="w-full min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Top Rated TV Shows</h2>

      <div className="flex flex-col md:flex-row gap-6 mt-3">
        {/* Left Sidebar */}
        <div className="md:w-[280px] flex-shrink-0 space-y-4">
          {/* Sort */}
          <div className="flex items-center justify-between bg-white px-5 py-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow">
            <p className="font-semibold text-gray-700 text-[16px]">Sort</p>
            <MdArrowForwardIos />
          </div>

          {/* Watch */}
          <div className="flex items-center justify-between bg-white px-5 py-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow">
            <p className="font-semibold text-gray-700 text-[16px]">Where To Watch</p>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                73
              </span>
              <MdArrowForwardIos />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between bg-white px-5 py-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow">
            <p className="font-semibold text-gray-700 text-[16px]">Filters</p>
            <MdArrowForwardIos />
          </div>

          {/* Search Button */}
          <div>
            <button className="w-full py-3.5 rounded-full text-white font-semibold text-[16px] bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] transition-transform">
              Search
            </button>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 md:gap-8">
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
            <div className="flex justify-center mt-10 pb-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className={`px-12 py-4 rounded-lg text-lg font-semibold uppercase tracking-wide shadow-md transition-all duration-300 
                  ${
                    loadingMore
                      ? "opacity-70 cursor-not-allowed bg-gradient-to-r from-sky-400 to-green-300"
                      : "bg-gradient-to-r from-sky-500 to-green-400 hover:-translate-y-1 hover:shadow-lg"
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

export default TvTopRated;
