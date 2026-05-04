import { usePuzzle } from "@/hooks/usePuzzle";
import { useEffect } from "react";
import { Text } from "react-native";

const PuzzleScreen = () => {
  const {
    data: puzzleData,
    loading: puzzleLoading,
    error: puzzleError,
    getRandomPuzzle,
  } = usePuzzle();

  useEffect(() => {
    getRandomPuzzle();
  }, []);

  if (puzzleError) {
    return <Text>Error! {puzzleError.toString()}</Text>;
  }

  if (puzzleLoading || !puzzleData) {
    return <Text>Loading...</Text>;
  }

  return <Text>{puzzleData.game.pgn}</Text>;
};

export default PuzzleScreen;
