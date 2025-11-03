// src/hooks/useAiringToday.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAiringToday } from "../reducer/moviesSlice";
import { useNavigate } from "react-router-dom";

const useAiringToday = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { airingToday } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [tvShows, setTvShows] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchAiringToday(1));
    const timer = setTimeout(() => setLoadingInitial(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Update shows on data load
  useEffect(() => {
    if (airingToday.length > 0) {
      setTimeout(() => {
        setTvShows((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const uniqueNewItems = airingToday.filter(
            (item) => !existingIds.has(item.id)
          );
          return currentPage === 1 ? airingToday : [...prev, ...uniqueNewItems];
        });
        setLoadingMore(false);
      }, 1000);
    }
  }, [airingToday, currentPage]);

  // Load more handler
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadingMore(true);
    dispatch(fetchAiringToday(nextPage));
  };

  // Helper: format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  // Helper: score color
  const getScoreColor = (score) => {
    if (score >= 80) return "#4CAF50";
    if (score >= 70) return "#FFC107";
    if (score >= 60) return "#FF9800";
    return "#F44336";
  };

  return {
    navigate,
    tvShows,
    loadingInitial,
    loadingMore,
    handleLoadMore,
    formatDate,
    getScoreColor,
  };
};

export default useAiringToday;
