import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpComing } from "../reducer/moviesSlice";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdArrowForwardIos } from "react-icons/md";

const Upcoming = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { upcoming } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [allUpcoming, setAllUpcoming] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(UpComing(1));
    const timer = setTimeout(() => setLoadingInitial(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (upcoming.length > 0) {
      if (currentPage === 1) {
        setAllUpcoming(upcoming);
      } else {
        setTimeout(() => {
          setAllUpcoming((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const newUniqueMovies = upcoming.filter(
              (m) => !existingIds.has(m.id)
            );
            return [...prev, ...newUniqueMovies];
          });
          setLoadingMore(false);
        }, 1000);
      }
    }
  }, [upcoming, currentPage]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadingMore(true);
    dispatch(UpComing(nextPage));
  };

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

  const UpcomingCard = ({ movie }) => {
    const score = Math.round(movie.vote_average * 10);
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    return (
      <div
        onClick={() => navigate(`/movie/${movie.id}`)}
        className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
      >
        <div className="w-full h-[250px] overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="absolute bottom-20 left-3">
          <div
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center font-bold text-xs bg-[#081c22] border-[3px]"
            style={{ borderColor: getScoreColor(score), color: getScoreColor(score) }}
          >
            {score}%
          </div>
        </div>

        <div className="p-4 pt-6">
          <h3 className="text-[16px] font-semibold text-gray-800 leading-tight line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-500">{formatDate(movie.release_date)}</p>
        </div>
      </div>
    );
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-[270px]">
        <Skeleton height={270} />
      </div>
      <div className="p-4">
        <Skeleton height={20} width={`80%`} />
        <Skeleton height={15} width={`50%`} />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 md:px-10 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Movies</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="w-full md:w-[280px] flex-shrink-0 space-y-4">
          {[
            { label: "Sort" },
            { label: "Where To Watch", count: 73 },
            { label: "Filters" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="w-full flex items-center justify-between bg-white shadow-sm rounded-lg px-5 py-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-gray-800">{item.label}</p>
              {item.count && (
                <span className="bg-gray-200 text-gray-600 text-sm px-2 py-[2px] rounded-full font-medium">
                  {item.count}
                </span>
              )}
              <MdArrowForwardIos className="text-gray-600" />
            </div>
          ))}

          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-full hover:opacity-90 transition">
            Search
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1 min-w-0">
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {loadingInitial
              ? Array(8)
                  .fill()
                  .map((_, i) => <SkeletonCard key={i} />)
              : allUpcoming.map((movie) => (
                  <UpcomingCard key={movie.id} movie={movie} />
                ))}
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
                className="bg-gradient-to-r from-[#01b4e4] to-[#90cea1] text-white px-10 py-3 rounded-lg font-semibold uppercase tracking-wide shadow-md hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
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

export default Upcoming;
