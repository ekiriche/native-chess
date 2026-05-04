import { PlayerColor } from "@/types/puzzle";
import { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { getSquareColor } from "./utils";

const chessboardColumns = ["a", "b", "c", "d", "e", "f", "g", "h"];
const chessboardRows = [8, 7, 6, 5, 4, 3, 2, 1];

type ChessboardProps = {
  playerColor: PlayerColor;
  fen: string;
};

export const Chessboard = ({ fen, playerColor }: ChessboardProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);

  const squareWidth = windowWidth / 8;

  return (
    <View
      style={{
        flexDirection: playerColor === "white" ? "column" : "column-reverse",
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
          {chessboardColumns.map((column, columnIndex) => (
            <View
              style={{
                width: squareWidth,
                height: squareWidth,
                backgroundColor: getSquareColor(rowIndex, columnIndex),
              }}
              key={column}
            ></View>
          ))}
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
