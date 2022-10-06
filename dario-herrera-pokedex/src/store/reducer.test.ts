import { IAppState } from "../shared/interfaces/IAppState.interface";
import { INITIAL_STATE, reducer } from "./reducer";
import { IAppAction } from "./actionCreator";
import { ActionTypes } from "./actionTypes";

describe("Reducer unit test", () => {
  let mock_initial_state: IAppState;

  beforeEach(() => {
    mock_initial_state = INITIAL_STATE;
  });

  it("should return the initial state when reducer is called", () => {
    expect(reducer(undefined, { type: "" })).toEqual(mock_initial_state);
  });

  it("should return a new state when SET_POKEMON_LIST_RESPONSE is called from reducer", () => {
    const action: IAppAction = {
      type: ActionTypes.SET_POKEMON_LIST_RESPONSE,
      pokemonListResponse: undefined,
    };

    expect(reducer(mock_initial_state, action)).toEqual({
      ...mock_initial_state,
      pokemonListResponse: undefined,
    });
  });

  it("should return a new state when SET_IS_LOADING is called from reducer", () => {
    const action: IAppAction = {
      type: ActionTypes.SET_IS_LOADING,
      isLoading: true,
    };

    expect(reducer(mock_initial_state, action)).toEqual({
      ...mock_initial_state,
      isLoading: true,
    });
  });

  it("should return a new state when SET_POKEMON_DETAILS_RESPONSE is called from reducer", () => {
    const action: IAppAction = {
      type: ActionTypes.SET_POKEMON_DETAILS_RESPONSE,
      pokemonDetailsResponse: undefined,
    };

    expect(reducer(mock_initial_state, action)).toEqual({
      ...mock_initial_state,
      pokemonDetailsResponse: undefined,
    });
  });

  it("should return a new state when SET_IS_NOT_FOUND is called from reducer", () => {
    const action: IAppAction = {
      type: ActionTypes.SET_IS_NOT_FOUND,
      isNotFoundPokemon: false,
    };

    expect(reducer(mock_initial_state, action)).toEqual({
      ...mock_initial_state,
      isNotFoundPokemon: false,
    });
  });
});
