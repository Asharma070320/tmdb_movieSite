import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useDetails from "../hooks/useDetails";

const Details = () => {
  const { name, loading, error, results, getScoreColor } = useDetails();

  const ResultCard = ({ item }) => {
    const score = Math.round((item.vote_average || 0) * 10);
    const posterUrl = (item.poster_path || item.profile_path)
      ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    return (
      <div className="relative bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
        {/* Poster */}
        <div className="w-full">
          <img
            src={posterUrl}
            alt={item.name || item.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Score (Movies & TV only) */}
        {(item.media_type === "movie" || item.media_type === "tv") &&
          item.vote_average > 0 && (
            <div
              className="absolute top-2 left-2 w-[45px] h-[45px] rounded-full border-[3px] bg-white flex items-center justify-center font-semibold text-sm"
              style={{ borderColor: getScoreColor(score) }}
            >
              <span style={{ color: getScoreColor(score) }}>{score}%</span>
            </div>
          )}

        {/* Info */}
        <div className="p-3">
          <h3 className="text-base font-semibold text-gray-800 mb-1 truncate">
            {item.name || item.title}
          </h3>

          {item.media_type === "person" && item.known_for?.length > 0 && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {item.known_for.map((work) => work.title || work.name).join(", ")}
            </p>
          )}
        </div>
      </div>
    );
  };

  const SkeletonCard = () => (
    <div className="relative bg-white rounded-lg shadow overflow-hidden">
      <div>
        <Skeleton height={250} />
      </div>
      <div className="absolute top-2 left-2">
        <Skeleton circle width={45} height={45} />
      </div>
      <div className="p-3">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="50%" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="text-center text-red-500 py-10 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Search Results for "<span className="text-blue-600">{name}</span>"
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading
          ? Array(8)
              .fill()
              .map((_, i) => <SkeletonCard key={i} />)
          : results.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10 text-lg">
                No results found.
              </div>
            ) : (
              results.map((item) => <ResultCard key={item.id} item={item} />)
            )}
      </div>
    </div>
  );
};

export default Details;
