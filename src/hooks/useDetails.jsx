// src/hooks/useDetails.js
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, SearchBarApi } from "../config";
import { useParams } from "react-router-dom";

const useDetails = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  // Fetch search data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${SearchBarApi}?api_key=${API_KEY}&query=${name}`
        );
        setResults(response.data.results || []);
      } catch {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [name]);

  // Score color helper
  const getScoreColor = (score) => {
    if (score >= 80) return "#4CAF50";
    if (score >= 70) return "#FFC107";
    if (score >= 60) return "#FF9800";
    return "#F44336";
  };

  return {
    name,
    loading,
    error,
    results,
    getScoreColor,
  };
};

export default useDetails;
