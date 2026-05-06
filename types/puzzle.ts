export type PlayerColor = "white" | "black";
export type PlayerColorShort = "w" | "b";

export type Puzzle = {
  game: {
    id: string;
    perf: {
      key: string;
      name: string;
    };
    rated: boolean;
    players: [
      {
        name: string;
        id: string;
        color: PlayerColor;
        rating: number;
      },
      {
        name: string;
        id: string;
        color: PlayerColor;
        rating: number;
      },
    ];
    pgn: string;
    clock: string;
  };
  puzzle: {
    id: string;
    rating: number;
    plays: number;
    solution: string[];
    themes: string[];
    initialPly: number;
  };
};
