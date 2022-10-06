import { configure, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as componentHook from "./state/useResumePokemonSelectedState";
import { IUseResumePokemonSelectedState } from "./state/IUseResumePokemonSelectedState";
import { BaseApiRouteEnum } from "../../shared/constants/BaseApiRouteEnum";
import { ResumePokemonSelected } from "./ResumePokemonSelected";

configure({ adapter: new Adapter() });

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("ResumePokemonSelected component unit test", () => {
  let wrapper: ShallowWrapper;
  let spy: jest.SpyInstance;
  let mockState: IUseResumePokemonSelectedState;

  const mockedHook = (mockValue: IUseResumePokemonSelectedState) => {
    spy = jest
      .spyOn(componentHook, "useResumePokemonSelectedState")
      .mockReturnValue(mockValue);
  };

  beforeEach(() => {
    mockState = {
      pokemonName: "pikachu",
      pokemonWeight: "150",
      moveArray: [
        {
          move: {
            name: "random",
            url: "https://pokeapi.co/api/v2/move/25/",
          },
          version_group_details: [],
        },
      ],
      pokemonId: "25",
      mainPokemonImageSrc: `${BaseApiRouteEnum.BASE_IMAGE_SVG_URL}/25`,
      spriteArray: [`${BaseApiRouteEnum.BASE_IMAGE_SVG_URL}/25`],
      pokemonType: [
        {
          type: {
            name: "random",
            url: "https://pokeapi.co/api/v2/move/25/",
          },
          slot: 25,
        },
      ],
    };

    mockedHook(mockState);

    wrapper = shallow(<ResumePokemonSelected />);
  });

  afterEach(() => {
    spy.mockClear();
    wrapper.unmount();
  });

  it("should render ResumePokemonSelected when is called", () => {
    expect(wrapper).toBeTruthy();
  });
});
