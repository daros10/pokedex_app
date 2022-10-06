import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { IAppState } from "../../../shared/interfaces/IAppState.interface";
import * as reactRedux from "react-redux";
import { INITIAL_STATE } from "../../../store/reducer";
import { renderHook } from "@testing-library/react-hooks/dom";
import { useCardPokemonContainerState } from "./useCardPokemonContainerState";

configure({ adapter: new Adapter() });

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("useCardPokemonContainerState", () => {
  let spyUseDispatch: jest.SpyInstance;
  let spyUseSelector: jest.SpyInstance;
  let storeState: IAppState = {
    ...INITIAL_STATE,
  };

  const mockReduxState = (state: IAppState) => {
    spyUseSelector.mockImplementation((cb: (value: IAppState) => any) => {
      return cb(state);
    });
    spyUseDispatch.mockReturnValue(jest.fn());
  };

  beforeEach(() => {
    storeState = {
      isNotFoundPokemon: false,
      isLoading: false,
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
      pokemonDetailsResponse: undefined,
    };

    spyUseSelector = jest.spyOn(reactRedux, "useSelector");
    spyUseDispatch = jest.spyOn(reactRedux, "useDispatch");

    mockReduxState(storeState);
  });

  afterEach(() => {
    spyUseDispatch.mockClear();
    spyUseSelector.mockClear();
  });

  it("should return an state when useCardPokemonContainerState is called", () => {
    const { result } = renderHook(() => useCardPokemonContainerState());

    expect(result.current.handleOnContainerClick).toBeTruthy();
    expect(result.current.pokemonListResponse).toEqual({
      count: 1154,
      next: "https://pokeapi.co/api/v2/pokemon?offset=4&limit=4",
      previous: null,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
      ],
    });
  });
});
