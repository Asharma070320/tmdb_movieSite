import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useTvShows } from "../hooks/useTvShows";

const Tv = () => {
  const navigate = useNavigate();
  const { allTv, loadingInitial, loadingMore, handleLoadMore } = useTvShows();

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
        onClick={() => navigate(`/tv/${show.id}`)}
        className="bg-white rounded-xl overflow-hidden shadow-md relative transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      >
        <div className="w-full h-[250px] overflow-hidden">
          <img
            src={posterUrl}
            alt={show.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Score Circle */}
        <div className="absolute bottom-20 left-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold border-4"
            style={{
              backgroundColor: "#081c22",
              borderColor: getScoreColor(score),
              color: getScoreColor(score),
            }}
          >
            {score}%
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pt-7">
          <h3 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">
            {show.name}
          </h3>
          <p className="text-sm text-gray-500">{formatDate(show.first_air_date)}</p>
        </div>
      </div>
    );
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <Skeleton height={250} />
      <div className="p-4">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="60%" />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        TV Shows
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="w-full md:w-[280px] flex-shrink-0 space-y-4">
          {/* Sort */}
          <div className="flex items-center justify-between px-5 py-4 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition">
            <p className="font-semibold text-gray-800">Sort</p>
            <MdArrowForwardIos className="text-gray-600" />
          </div>

          {/* Where to Watch */}
          <div className="flex items-center justify-between px-5 py-4 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition">
            <p className="font-semibold text-gray-800">Where To Watch</p>
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full font-medium">
                73
              </span>
              <MdArrowForwardIos className="text-gray-600" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between px-5 py-4 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition">
            <p className="font-semibold text-gray-800">Filters</p>
            <MdArrowForwardIos className="text-gray-600" />
          </div>

          {/* Search Button */}
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg transition-transform hover:-translate-y-1 shadow-md">
            Search
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1 min-w-0">
          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {loadingInitial
              ? Array(8)
                  .fill()
                  .map((_, i) => <SkeletonCard key={i} />)
              : allTv.map((show) => <TvCard key={show.id} show={show} />)}

            {loadingMore &&
              Array(8)
                .fill()
                .map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
          </div>

          {/* Load More */}
          {!loadingInitial && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className={`w-full sm:w-auto px-10 py-4 rounded-lg font-semibold text-lg uppercase tracking-wide transition-all shadow-md ${
                  loadingMore
                    ? "bg-gradient-to-r from-sky-400 to-green-300 opacity-70 cursor-not-allowed"
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

export default Tv;
