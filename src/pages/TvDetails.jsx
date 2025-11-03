import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../config";

const TvDetails = () => {
  const { id } = useParams();
  const [tv, setTv] = useState(null);

  useEffect(() => {
    const fetchTvDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits`
        );
        setTv(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTvDetails();
  }, [id]);

  if (!tv)
    return (
      <div className="text-white text-center py-20 bg-[#111] text-2xl font-medium">
        Loading...
      </div>
    );

  const score = Math.round(tv.vote_average * 10);

  const getScoreColor = (score) => {
    if (score >= 80) return "#21d07a";
    if (score >= 60) return "#d2d531";
    return "#db2360";
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(31,31,31,0.9)] via-[rgba(31,31,31,0.7)] to-[rgba(31,31,31,0.5)]"></div>

      {/* Content */}
      <div className="relative flex flex-col md:flex-row gap-8 p-6 sm:p-10 lg:p-12 z-10">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
            alt={tv.name}
            className="w-[250px] sm:w-[300px] rounded-lg shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {tv.name}{" "}
            <span className="text-gray-300 font-normal">
              ({tv.first_air_date?.slice(0, 4)})
            </span>
          </h1>

          {/* Sub Info */}
          <div className="flex flex-wrap items-center gap-3 text-gray-300 text-sm mb-4">
            <span className="border border-gray-400 px-1.5 py-0.5 rounded text-xs">
              A
            </span>
            <span>{new Date(tv.first_air_date).toLocaleDateString("en-IN")}</span>
            <span>• {tv.genres.map((g) => g.name).join(", ")}</span>
            <span>• {tv.number_of_seasons} Season(s)</span>
          </div>

          {/* Score + Tagline + Button */}
          <div className="flex flex-wrap items-center gap-6 my-6">
            {/* Score Circle */}
            <div
              className="w-[60px] h-[60px] rounded-full border-[4px] flex items-center justify-center font-bold text-sm"
              style={{
                borderColor: getScoreColor(score),
                color: getScoreColor(score),
                backgroundColor: "#081c22",
              }}
            >
              {score}%
            </div>

            {/* Tagline */}
            {tv.tagline && (
              <p className="italic text-gray-300 text-base">{tv.tagline}</p>
            )}

            {/* Trailer Button */}
            <button className="bg-[#01b4e4] hover:bg-[#009ac7] text-white px-4 py-2 rounded-md font-medium transition">
              ▶ Play Trailer
            </button>
          </div>

          {/* Overview */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{tv.overview}</p>
          </div>

          {/* Credits */}
          <div className="mt-6 flex flex-wrap gap-6">
            {tv.credits?.crew?.slice(0, 6).map((person) => (
              <div key={person.credit_id} className="w-[140px]">
                <p className="font-semibold">{person.name}</p>
                <p className="text-gray-400 text-sm">{person.job}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDetails;
