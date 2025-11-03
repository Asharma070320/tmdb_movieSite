import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topRatedMovies } from "../reducer/moviesSlice";

export const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const { toprate } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [allTopRated, setAllTopRated] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Initial Fetch
  useEffect(() => {
    dispatch(topRatedMovies(1));
    const timer = setTimeout(() => setLoadingInitial(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // When API Data or page changes
  useEffect(() => {
    if (toprate.length > 0) {
      if (currentPage === 1) {
        setAllTopRated(toprate);
      } else {
        setTimeout(() => {
          setAllTopRated((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const newUniqueMovies = toprate.filter(
              (m) => !existingIds.has(m.id)
            );
            return [...prev, ...newUniqueMovies];
          });
          setLoadingMore(false);
        }, 1000);
      }
    }
  }, [toprate, currentPage]);

  // Load More Button Handler
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadingMore(true);
    dispatch(topRatedMovies(nextPage));
  };

  return {
    allTopRated,
    loadingInitial,
    loadingMore,
    handleLoadMore,
  };
};
