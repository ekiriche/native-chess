import { PlayerColorShort } from "@/types/puzzle";
import { Chess, Square } from "chess.js";
import { useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { PIECES_MAP } from "./piecesMap";
import { getSquareColor } from "./utils";

const chessboardColumns = ["a", "b", "c", "d", "e", "f", "g", "h"];
const chessboardRows = [8, 7, 6, 5, 4, 3, 2, 1];

type ChessboardProps = {
  playerColorShort: PlayerColorShort;
  chessGame: Chess;
  onMove: (from: Square, to: Square) => void;
};

export const Chessboard = ({
  chessGame,
  playerColorShort,
  onMove,
}: ChessboardProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  const squareWidth = windowWidth / 8;

  return (
    <View
      style={{
        // flexDirection: playerColorShort === "w" ? "column" : "column-reverse",
        height: windowWidth,
        marginTop: 24,
      }}
    >
      {chessboardRows.map((row, rowIndex) => (
        <View style={{ flexDirection: "row", flex: 1 }} key={row}>
          <Text
            style={{
              position: "absolute",
              top: 0,
              left: 4,
              zIndex: 10,
              fontSize: 12,
            }}
          >
            {row}
          </Text>
          {chessboardColumns.map((column, columnIndex) => {
            const square = `${column}${row}` as Square;
            const piece = chessGame.get(square);
            const isSelectedSquare = selectedSquare === square;
            return (
              <Pressable
                style={{
                  width: squareWidth,
                  height: squareWidth,
                  backgroundColor: getSquareColor(rowIndex, columnIndex),
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: isSelectedSquare ? 1 : 0,
                  borderColor: isSelectedSquare ? "red" : "unset",
                }}
                key={column}
                onPress={() => {
                  console.log("Pressing!");
                  if (selectedSquare && square !== selectedSquare) {
                    console.log("Trying to move! ", selectedSquare, square);
                    onMove(selectedSquare, square);
                    setSelectedSquare(null);

                    return;
                  }

                  if (selectedSquare && square === selectedSquare) {
                    setSelectedSquare(null);

                    return;
                  }

                  if (piece && piece?.color === playerColorShort) {
                    setSelectedSquare(square);
                  } else {
                    setSelectedSquare(null);
                  }
                }}
              >
                {piece && (
                  <Text style={{ fontSize: squareWidth / 1.5 }}>
                    {PIECES_MAP[`${piece.type}${piece.color}`]}
                  </Text>
                )}
                {rowIndex === 7 && (
                  <Text style={{ position: "absolute", bottom: 0, right: 4 }}>
                    {column}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

// const styles = StyleSheet.create({
//     square: {
//         width:
//     }
// })
