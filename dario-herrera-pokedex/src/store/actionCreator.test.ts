import configureMockStore, { MockStoreCreator } from "redux-mock-store";
import thunk from "redux-thunk";
import { INITIAL_STATE } from "./reducer";
import { ActionTypes } from "./actionTypes";
import axios from "axios";
import {
  getPokemonDetailsByNameOrId,
  getPokemonListByLimitAndOffset,
  setIsLoading,
  setIsNotFoundPokemon,
  setPokemonDetails,
  setPokemonList,
} from "./actionCreator";
import { IPokemonListResponse } from "../shared/interfaces/IPokemonListResponse";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("ActionCreator unit test", () => {
  let middlewares;
  let mockStore: MockStoreCreator;
  let apiResponse: IPokemonListResponse;

  const mockSchemas = (): void => {
    apiResponse = {
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
    };
  };

  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
    mockSchemas();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should setPokemonList data when is called", async () => {
    const store = mockStore(INITIAL_STATE);

    store.dispatch(setPokemonList(undefined));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.SET_POKEMON_LIST_RESPONSE,
        pokemonListResponse: undefined,
      },
    ]);
  });

  it("should setPokemonDetails data when is called", async () => {
    const store = mockStore(INITIAL_STATE);

    store.dispatch(setPokemonDetails(undefined));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.SET_POKEMON_DETAILS_RESPONSE,
        pokemonDetailsResponse: undefined,
      },
    ]);
  });

  it("should setIsLoading data when is called", async () => {
    const store = mockStore(INITIAL_STATE);

    store.dispatch(setIsLoading(true));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.SET_IS_LOADING,
        isLoading: true,
      },
    ]);
  });

  it("should setIsNotFoundPokemon data when is called", async () => {
    const store = mockStore(INITIAL_STATE);

    store.dispatch(setIsNotFoundPokemon(true));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.SET_IS_NOT_FOUND,
        isNotFoundPokemon: true,
      },
    ]);
  });

  it("should dispatch an action successfully when getPokemonListByLimitAndOffset is called", async () => {
    const dispatch = jest.fn();

    axios.get = jest.fn().mockResolvedValue({ apiResponse });

    getPokemonListByLimitAndOffset(apiResponse.next)(
      dispatch,
      dispatch,
      undefined
    );

    expect(axios.get).toHaveBeenCalled();
  });

  it("should dispatch an error when getPokemonListByLimitAndOffset is called", async () => {
    const dispatch = jest.fn();

    axios.get = jest.fn().mockRejectedValue(new Error("Error"));

    getPokemonListByLimitAndOffset()(dispatch, dispatch, undefined);

    expect(axios.get).toHaveBeenCalled();
  });

  it("should dispatch an action successfully when getPokemonDetailsByNameOrId is called", async () => {
    const dispatch = jest.fn();

    axios.get = jest.fn().mockResolvedValue({ undefined });

    getPokemonDetailsByNameOrId("pikachu")(dispatch, dispatch, undefined);

    expect(axios.get).toHaveBeenCalled();
  });

  it("should dispatch an action successfully when getPokemonDetailsByNameOrId is called with a flag", async () => {
    const dispatch = jest.fn();

    axios.get = jest.fn().mockResolvedValue({ undefined });

    getPokemonDetailsByNameOrId("pikachu", true)(dispatch, dispatch, undefined);

    expect(axios.get).toHaveBeenCalled();
  });

  it("should dispatch an error when getPokemonDetailsByNameOrId is called", async () => {
    const dispatch = jest.fn();

    axios.get = jest.fn().mockRejectedValue(new Error("Error"));

    getPokemonDetailsByNameOrId(1)(dispatch, dispatch, undefined);

    expect(axios.get).toHaveBeenCalled();
  });
});
