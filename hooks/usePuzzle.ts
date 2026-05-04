import { getRandomPuzzleRequest } from "@/services/lichess";
import { Puzzle } from "@/types/puzzle";
import { useState } from "react";

export const usePuzzle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Puzzle | null>(null);

  const getRandomPuzzle = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomPuzzleRequest();
      setData(data);
    } catch (error) {
      console.error(error);
      setError("Something is wrong!");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getRandomPuzzle,
  };
};
