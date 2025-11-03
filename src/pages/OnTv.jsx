import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import useOnTv from "../hooks/useOnTv";

const OnTv = () => {
  const navigate = useNavigate();
  const { tvShows, loadingInitial, loadingMore, handleLoadMore } = useOnTv();

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
        className="relative bg-white rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={() => navigate(`/tv/${show.id}`)}
      >
        <div className="w-full h-64 overflow-hidden rounded-t-xl">
          <img
            src={posterUrl}
            alt={show.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Score Circle */}
        <div className="absolute bottom-20 left-3 z-10">
          <div
            className="w-12 h-12 rounded-full bg-[#081c22] flex items-center justify-center font-bold text-xs"
            style={{ border: `3px solid ${getScoreColor(score)}` }}
          >
            <span style={{ color: getScoreColor(score) }}>{score}%</span>
          </div>
        </div>

        <div className="p-4 pt-7">
          <h3 className="text-base font-bold text-gray-800 line-clamp-2">
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-64">
        <Skeleton height={270} />
      </div>
      <div className="absolute bottom-20 left-3">
        <Skeleton circle width={40} height={40} />
      </div>
      <div className="p-4">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="50%" />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 md:px-8 py-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">On TV</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="w-full md:w-72 flex-shrink-0 space-y-4">
          {/* Sort */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
            <p className="font-semibold text-gray-800 text-base">Sort</p>
            <MdArrowForwardIos />
          </div>

          {/* Where to Watch */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-800 text-base">
                Where To Watch
              </p>
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-sm font-medium">
                73
              </span>
            </div>
            <MdArrowForwardIos />
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
            <p className="font-semibold text-gray-800 text-base">Filters</p>
            <MdArrowForwardIos />
          </div>

          {/* Search Button */}
          <button className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-transform duration-200 shadow-md">
            Search
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
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
                className={`px-8 py-3 rounded-lg text-lg font-semibold text-white uppercase tracking-wide shadow-lg transition-all duration-300 ${
                  loadingMore
                    ? "opacity-70 cursor-not-allowed bg-gradient-to-r from-cyan-400 to-green-300"
                    : "bg-gradient-to-r from-cyan-500 to-green-400 hover:scale-105"
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

export default OnTv;
