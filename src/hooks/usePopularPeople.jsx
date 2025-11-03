import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPeople } from "../reducer/moviesSlice";

const usePopularPeople = () => {
  const dispatch = useDispatch();
  const { popularPeople, totalPages } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPopularPeople(currentPage));
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setLoading(true);
      window.scrollTo(0, 0);
    }
  };

  return {
    popularPeople,
    totalPages,
    currentPage,
    loading,
    handlePageChange,
  };
};

export default usePopularPeople;
