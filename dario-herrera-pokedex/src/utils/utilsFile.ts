import { ResultResponse } from "../shared/interfaces/IPokemonListResponse";

export const generateRandomColor = (): string => {
  let letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 10)];
  }

  return color;
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getPokemonId = (response: ResultResponse): number => {
  const arrayValues: string[] = response.url.split("pokemon");

  return Number(arrayValues[1].replace(/\//g, ""));
};
