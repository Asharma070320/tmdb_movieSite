// src/hooks/useMovie.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popularMovies, NowPlaying } from "../reducer/moviesSlice";

const useMovie = () => {
  const dispatch = useDispatch();
  const { popular } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Initial fetch
  useEffect(() => {
    dispatch(popularMovies(1));
    dispatch(NowPlaying(1));

    const timer = setTimeout(() => setLoadingInitial(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Update movies when new data arrives
  useEffect(() => {
    if (popular.length > 0) {
      if (currentPage === 1) {
        setAllMovies(popular);
      } else {
        setTimeout(() => {
          setAllMovies((prev) => [...prev, ...popular]);
          setLoadingMore(false);
        }, 1000);
      }
    }
  }, [popular, currentPage]);

  // Load more pages
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadingMore(true);
    dispatch(popularMovies(nextPage));
  };

  // Format release date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  // Return color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return "#4CAF50";
    if (score >= 70) return "#FFC107";
    if (score >= 60) return "#FF9800";
    return "#F44336";
  };

  return {
    allMovies,
    loadingInitial,
    loadingMore,
    handleLoadMore,
    formatDate,
    getScoreColor,
  };
};

export default useMovie;
