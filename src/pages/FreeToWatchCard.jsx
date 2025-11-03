// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOnTv, fetchTvTopRated } from '../reducer/moviesSlice';
// import { useNavigate } from 'react-router-dom';
// import MovieCarouselSection from '../components/MovieCarouselSection';

// const FreeToWatchCard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('today');
//   const [isCustomLoading, setIsCustomLoading] = useState(false);
//   const { onTv, tvTopRated, loading, error } = useSelector((state) => state.movies);

//   useEffect(() => {
//     let timer;
//     const fetchData = async () => {
//       setIsCustomLoading(true);
//       if (activeTab === 'today') {
//         await dispatch(fetchOnTv());
//       } else {
//         await dispatch(fetchTvTopRated());
//       }
//       timer = setTimeout(() => setIsCustomLoading(false), 1000);
//     };
//     fetchData();
//     return () => clearTimeout(timer);
//   }, [dispatch, activeTab]);

//   const moviesToShow = activeTab === 'today' ? onTv : tvTopRated;

//   return (
//     <MovieCarouselSection
//       title="Free To Watch"
//       activeTab={activeTab}
//       setActiveTab={setActiveTab}
//       tabLabels={[
//         { key: 'today', label: 'TV' },
//         { key: 'week', label: 'Top Rated' }
//       ]}
//       movies={moviesToShow}
//       loading={loading || isCustomLoading}
//       error={error}
//       onCardClick={(id) => navigate(`/tv/${id}`)}
//     />
//   );
// };

// export default FreeToWatchCard;


import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCarouselSection from "../components/MovieCarouselSection";
import useFreeToWatchCard from "../hooks/useFreeToWatchCard";

const FreeToWatchCard = () => {
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
    moviesToShow,
    isCustomLoading,
    loading,
    error,
  } = useFreeToWatchCard();

  return (
    <MovieCarouselSection
      title="Free To Watch"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabLabels={[
        { key: "today", label: "TV" },
        { key: "week", label: "Top Rated" },
      ]}
      movies={moviesToShow}
      loading={loading || isCustomLoading}
      error={error}
      onCardClick={(id) => navigate(`/tv/${id}`)}
    />
  );
};

export default FreeToWatchCard;
