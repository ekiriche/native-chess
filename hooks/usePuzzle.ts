import { getRandomPuzzleRequest } from "@/services/lichess";
import { Puzzle } from "@/types/puzzle";
import { Chess } from "chess.js";
import { useState } from "react";

export const usePuzzle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [game, setGame] = useState<Chess | null>(null);
  const [data, setData] = useState<Puzzle | null>(null);

  const getRandomPuzzle = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomPuzzleRequest();
      const chessGame = new Chess();

      chessGame.loadPgn(data.game.pgn);

      setGame(chessGame);
      setData(data);
      console.log(chessGame.ascii())
      console.log("Solution => ", data.puzzle.solution);
    } catch (error) {
      console.error(error);
      setError("Something is wrong!");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    game,
    loading,
    error,
    getRandomPuzzle,
  };
};
