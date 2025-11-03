import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvTopRated } from "../reducer/moviesSlice";

export const useTvTopRated = () => {
  const dispatch = useDispatch();
  const { tvTopRated } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [tvShows, setTvShows] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchTvTopRated(1));
    const timer = setTimeout(() => setLoadingInitial(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Update when data or page changes
  useEffect(() => {
    if (tvTopRated.length > 0) {
      setTimeout(() => {
        setTvShows((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const uniqueNewItems = tvTopRated.filter(
            (item) => !existingIds.has(item.id)
          );
          return currentPage === 1 ? tvTopRated : [...prev, ...uniqueNewItems];
        });
        setLoadingMore(false);
      }, 1000);
    }
  }, [tvTopRated, currentPage]);

  // Load More
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadingMore(true);
    dispatch(fetchTvTopRated(nextPage));
  };

  return {
    tvShows,
    loadingInitial,
    loadingMore,
    handleLoadMore,
  };
};
