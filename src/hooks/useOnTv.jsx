import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnTv } from "../reducer/moviesSlice";

const useOnTv = () => {
  const dispatch = useDispatch();
  const { onTv } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [tvShows, setTvShows] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchOnTv(1));
    const timer = setTimeout(() => setLoadingInitial(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Append data or reset on first page
  useEffect(() => {
    if (onTv.length > 0) {
      setTimeout(() => {
        setTvShows((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const uniqueNewItems = onTv.filter(
            (item) => !existingIds.has(item.id)
          );
          return currentPage === 1 ? onTv : [...prev, ...uniqueNewItems];
        });
        setLoadingMore(false);
      }, 1000);
    }
  }, [onTv, currentPage]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadingMore(true);
    dispatch(fetchOnTv(nextPage));
  };

  return {
    tvShows,
    loadingInitial,
    loadingMore,
    handleLoadMore,
  };
};

export default useOnTv;
