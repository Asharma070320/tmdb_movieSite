import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { popularMovies, NowPlaying } from '../reducer/moviesSlice';
import { useNavigate } from 'react-router-dom';
import MovieCarouselSection from '../components/MovieCarouselSection';

const TrendingMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [isCustomLoading, setIsCustomLoading] = useState(false);
  const { popular, nowPlaying, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    let timer;
    const fetchData = async () => {
      setIsCustomLoading(true);
      if (activeTab === 'today') {
        await dispatch(popularMovies());
      } else {
        await dispatch(NowPlaying());
      }
      timer = setTimeout(() => setIsCustomLoading(false), 1000);
    };
    fetchData();
    return () => clearTimeout(timer);
  }, [dispatch, activeTab]);

  const moviesToShow = activeTab === 'today' ? popular : nowPlaying;

  return (
    <MovieCarouselSection
      title="Trending"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabLabels={[
        { key: 'today', label: 'Today' },
        { key: 'week', label: 'This Week' }
      ]}
      movies={moviesToShow}
      loading={loading || isCustomLoading}
      error={error}
      onCardClick={(id) => navigate(`/movie/${id}`)}
    />
  );
};

export default TrendingMovies;
