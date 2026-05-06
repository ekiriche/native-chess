import { Button } from "@/components/Button";
import { Chessboard } from "@/components/Chessboard";
import { usePuzzle } from "@/hooks/usePuzzle";
import { COLOR_SHORT_TO_FULL } from "@/utils/colorMap";
import { Chess, Square } from "chess.js";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PuzzleScreen = () => {
  const {
    data: puzzleData,
    game: initialGame,
    loading: puzzleLoading,
    error: puzzleError,
    getRandomPuzzle,
  } = usePuzzle();
  const [currentGame, setCurrentGame] = useState(initialGame);
  const [turnCount, setTurnCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialGame) {
      setCurrentGame(new Chess(initialGame?.fen()));
    }
  }, [initialGame]);

  const handleMove = (from: Square, to: Square) => {
    if (!currentGame || !puzzleData) {
      return;
    }

    const move = `${from}${to}`;

    try {
      const correctMove = puzzleData.puzzle.solution[turnCount];
      if (move !== correctMove) {
        setMessage("Wrong move!");

        return;
      }
      currentGame.move({ from, to });

      if (turnCount + 1 === puzzleData?.puzzle.solution.length) {
        setMessage("Congrats! You did it!");

        return;
      } else {
        setMessage(null);
      }

      const nextMove = puzzleData.puzzle.solution[turnCount + 1];
      setTimeout(() => {
        currentGame.move(nextMove);

        setTurnCount((value) => value + 2);
      }, 300);
    } catch {
      setMessage("Illegal move!");
    }
  };

  const handleGenerateNewPuzzle = () => {
    setTurnCount(0);
    setCurrentGame(null);
    setMessage(null);
    getRandomPuzzle();
  };

  const getContent = () => {
    if (!puzzleLoading && !initialGame) {
      return <Text>Press a button above to generate a puzzle!</Text>;
    }

    if (puzzleError) {
      return <Text>Error! {puzzleError.toString()}</Text>;
    }

    if (puzzleLoading || !initialGame || !currentGame) {
      return <Text>Loading...</Text>;
    }

    return (
      <View>
        <Chessboard
          playerColorShort={initialGame.turn()}
          chessGame={currentGame}
          onMove={handleMove}
        />
        <Text>
          You are playing as {COLOR_SHORT_TO_FULL[initialGame.turn()]}
        </Text>
        <Text style={{ marginTop: 16, color: "red" }}>{message}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button onPress={handleGenerateNewPuzzle} text={"Get puzzle"} />
      <View>{getContent()}</View>
    </SafeAreaView>
  );
};

export default PuzzleScreen;
