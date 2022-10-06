import {
  capitalizeFirstLetter,
  generateRandomColor,
  getPokemonId,
} from "./utilsFile";
import { ResultResponse } from "../shared/interfaces/IPokemonListResponse";

describe("UtilsFile unit test", () => {
  it("should return a random string color when generateRandomColor is called", () => {
    expect(typeof generateRandomColor()).toBe("string");
    expect(generateRandomColor()).toBeTruthy();
  });

  it("should capitalize first letter of a string when capitalizeFirstLetter is called", () => {
    const textNotCapitalize: string = "pikachu";
    const textCapitalized: string = "Pikachu";

    expect(capitalizeFirstLetter(textNotCapitalize)).toEqual(textCapitalized);
  });

  it("should return an id from pokeApi url when getPokemonId is called", () => {
    const resultResponseApi: ResultResponse = {
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/pokemon/25/",
    };

    expect(getPokemonId(resultResponseApi)).toEqual(25);
  });
});
