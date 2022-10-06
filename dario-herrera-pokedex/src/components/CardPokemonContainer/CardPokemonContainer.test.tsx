import { configure, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as componentHook from "./state/useCardPokemonContainerState";
import { IUseCardPokemonContainer } from "./state/IUseCardPokemonContainer";
import { CardPokemonContainer } from "./CardPokemonContainer";

configure({ adapter: new Adapter() });

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("CardPokemonContainer component unit test", () => {
  let wrapper: ShallowWrapper;
  let spy: jest.SpyInstance;
  let mockState: IUseCardPokemonContainer;

  const mockedHook = (mockValue: IUseCardPokemonContainer) => {
    spy = jest
      .spyOn(componentHook, "useCardPokemonContainerState")
      .mockReturnValue(mockValue);
  };

  beforeEach(() => {
    mockState = {
      handleOnContainerClick: jest.fn(),
      pokemonListResponse: {
        count: 1154,
        next: "https://pokeapi.co/api/v2/pokemon?offset=4&limit=4",
        previous: null,
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
          {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon/2/",
          },
          {
            name: "venusaur",
            url: "https://pokeapi.co/api/v2/pokemon/3/",
          },
          {
            name: "charmander",
            url: "https://pokeapi.co/api/v2/pokemon/4/",
          },
        ],
      },
    };

    mockedHook(mockState);

    wrapper = shallow(<CardPokemonContainer />);
  });

  afterEach(() => {
    spy.mockClear();
    wrapper.unmount();
  });

  it("should render CardPokemonContainer when is called", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("img").length).toEqual(4);
  });
});
