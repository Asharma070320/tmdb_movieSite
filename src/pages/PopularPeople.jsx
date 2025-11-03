import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import usePopularPeople from "../hooks/usePopularPeople";

const PopularPeople = () => {
  const {
    popularPeople,
    totalPages,
    currentPage,
    loading,
    handlePageChange,
  } = usePopularPeople();

  // ✅ Person Card Component
  const PersonCard = ({ person }) => {
    const imageUrl = person.profile_path
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={imageUrl}
          alt={person.name}
          className="w-full h-72 object-cover"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {person.known_for?.map((item) => item.title || item.name).join(", ")}
          </p>
        </div>
      </div>
    );
  };

  // ✅ Skeleton Card for loading state
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <Skeleton height={288} />
      <div className="p-4">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="60%" />
      </div>
    </div>
  );

  // ✅ Pagination Buttons
  const renderPagination = () => {
    const pages = [];

    // Prev Button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 hover:text-white border-blue-500 text-blue-600"
        }`}
      >
        Prev
      </button>
    );

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
      const isEnd = i === totalPages;
      const isNearCurrent = Math.abs(currentPage - i) <= 1;

      if (isEnd || isNearCurrent || i === 1) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage === i
                ? "bg-blue-600 text-white border border-blue-600"
                : "border border-gray-300 hover:bg-blue-100"
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === 2 && currentPage > 4) ||
        (i === totalPages - 1 && currentPage < totalPages - 3)
      ) {
        pages.push(
          <span key={`dots-${i}`} className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Next Button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 hover:text-white border-blue-500 text-blue-600"
        }`}
      >
        Next
      </button>
    );

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        {pages}
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
        Popular People
      </h2>

      {/* ✅ Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {loading
          ? Array(8)
              .fill()
              .map((_, i) => <SkeletonCard key={i} />)
          : popularPeople.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
      </div>

      {/* ✅ Pagination */}
      {renderPagination()}
    </div>
  );
};

export default PopularPeople;
