// src/hooks/useFreeToWatchCard.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnTv, fetchTvTopRated } from "../reducer/moviesSlice";

const useFreeToWatchCard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("today");
  const [isCustomLoading, setIsCustomLoading] = useState(false);

  const { onTv, tvTopRated, loading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    let timer;
    const fetchData = async () => {
      setIsCustomLoading(true);

      if (activeTab === "today") {
        await dispatch(fetchOnTv());
      } else {
        await dispatch(fetchTvTopRated());
      }

      timer = setTimeout(() => setIsCustomLoading(false), 1000);
    };

    fetchData();

    return () => clearTimeout(timer);
  }, [dispatch, activeTab]);

  const moviesToShow = activeTab === "today" ? onTv : tvTopRated;

  return {
    activeTab,
    setActiveTab,
    moviesToShow,
    isCustomLoading,
    loading,
    error,
  };
};

export default useFreeToWatchCard;
