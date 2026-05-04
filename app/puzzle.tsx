import { Chessboard } from "@/components/Chessboard";
import { usePuzzle } from "@/hooks/usePuzzle";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PuzzleScreen = () => {
  const {
    data: puzzleData,
    loading: puzzleLoading,
    error: puzzleError,
    getRandomPuzzle,
  } = usePuzzle();

  // useEffect(() => {
  //   getRandomPuzzle();
  // }, []);

  const getContent = () => {
    if (puzzleError) {
      return <Text>Error! {puzzleError.toString()}</Text>;
    }

    if (puzzleLoading) {
      return <Text>Loading...</Text>;
    }

    return <Chessboard playerColor="white" fen={puzzleData?.game?.pgn} />;
  };

  return <SafeAreaView style={{ flex: 1 }}>{getContent()}</SafeAreaView>;
};

export default PuzzleScreen;
