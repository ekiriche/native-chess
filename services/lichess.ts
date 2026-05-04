import { Puzzle } from "@/types/puzzle";

const API_URL = "https://lichess.org/api/puzzle";

const getRandomPuzzleErrorMap: { [key: number]: string } = {
  400: "Malformed request.",
  429: "Too many requests! Slow down, cowboy.",
  500: "Server general error.",
};

export const getRandomPuzzleRequest = async (): Promise<Puzzle> => {
  try {
    const response = await fetch(`${API_URL}/next`);

    if (!response.ok) {
      console.log(response);
      throw new Error(getRandomPuzzleErrorMap[response.status]);
    }
    const data: Puzzle = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
