import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCarouselSection = ({
  title,
  activeTab,
  setActiveTab,
  tabLabels,
  movies,
  onCardClick,
  loading,
  error,
}) => {
  const getRatingColor = (rating) => {
    if (rating >= 8) return "#22c55e";
    if (rating >= 7) return "#eab308";
    if (rating >= 6) return "#f97316";
    return "#ef4444";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderSkeleton = () =>
    Array.from({ length: 8 }, (_, index) => (
      <div
        key={index}
        className="min-w-[180px] max-w-[180px] rounded-xl overflow-hidden"
      >
        <Skeleton height={225} borderRadius={8} />
        <Skeleton height={18} className="mt-2" />
        <Skeleton width={80} height={14} className="mt-1" />
      </div>
    ));

  return (
    <div className="p-6 text-white font-sans">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6 flex-wrap">
        <h2 className="text-[28px] font-bold text-black">{title}</h2>

        <div className="flex bg-slate-800/60 rounded-full p-1 backdrop-blur-md">
          {tabLabels.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#1d3965] to-[#1d4ed8] text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div className="flex gap-4 overflow-x-auto scroll-smooth py-2 pb-5 no-scrollbar">
          {loading
            ? renderSkeleton()
            : movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => onCardClick(movie.id)}
                  className="min-w-[180px] max-w-[180px] relative rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                >
                  {/* Poster */}
                  <div className="w-full h-[250px] bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl overflow-hidden relative">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-600 text-5xl text-gray-500">
                        🎬
                      </div>
                    )}

                    {/* Rating Badge */}
                    <div
                      className="absolute top-[65%] left-2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center font-bold text-xs text-white border-4"
                      style={{
                        borderColor: getRatingColor(movie.vote_average),
                      }}
                    >
                      {Math.round(movie.vote_average * 10)}%
                    </div>
                  </div>

                  {/* Info */}
                  <div className="py-3">
                    <h3 className="text-[16px] font-semibold text-black truncate">
                      {movie.title || movie.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {movie.release_date || movie.first_air_date
                        ? formatDate(movie.release_date || movie.first_air_date)
                        : "TBA"}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {error && (
        <p className="text-center text-red-500 text-[16px] py-5">{error}</p>
      )}
    </div>
  );
};

export default MovieCarouselSection;
