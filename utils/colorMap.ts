import { PlayerColor, PlayerColorShort } from "@/types/puzzle";

export const COLOR_SHORT_TO_FULL: { [key in PlayerColorShort]: PlayerColor } = {
  w: "white",
  b: "black",
};

export const COLOR_FULL_TO_SHORT: { [key in PlayerColor]: PlayerColorShort } = {
  white: "w",
  black: "b",
};
