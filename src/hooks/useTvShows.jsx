import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTvList } from "../reducer/moviesSlice";

export const useTvShows = () => {
  const dispatch = useDispatch();
  const { tvlist } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [allTv, setAllTv] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Initial load
  useEffect(() => {
    dispatch(allTvList(1));
    const timer = setTimeout(() => setLoadingInitial(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // When tvlist or page changes
  useEffect(() => {
    if (tvlist.length > 0) {
      setTimeout(() => {
        setAllTv((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const uniqueNewItems = tvlist.filter(
            (item) => !existingIds.has(item.id)
          );
          return currentPage === 1 ? tvlist : [...prev, ...uniqueNewItems];
        });
        setLoadingMore(false);
      }, 1000);
    }
  }, [tvlist, currentPage]);

  // Load More
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadingMore(true);
    dispatch(allTvList(nextPage));
  };

  return {
    allTv,
    loadingInitial,
    loadingMore,
    handleLoadMore,
  };
};
