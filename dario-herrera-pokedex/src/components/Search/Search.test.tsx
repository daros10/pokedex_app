import { configure, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as componentHook from "./state/useSearchState";
import { IUseSearchState } from "./state/IUseSearchState";
import { Search } from "./Search";

configure({ adapter: new Adapter() });

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Search component unit test", () => {
  let wrapper: ShallowWrapper;
  let spy: jest.SpyInstance;
  let mockState: IUseSearchState;

  const mockedHook = (mockValue: IUseSearchState) => {
    spy = jest
      .spyOn(componentHook, "useSearchState")
      .mockReturnValue(mockValue);
  };

  beforeEach(() => {
    mockState = {
      isNotFoundPokemon: false,
      isRenderMessage: true,
      handleOnInputChance: jest.fn(),
    };

    mockedHook(mockState);

    wrapper = shallow(<Search />);
  });

  afterEach(() => {
    wrapper.unmount();
    spy.mockClear();
  });

  it("should render Search and Alert component when is called", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("label").length).toEqual(1);
    expect(wrapper.find("input").length).toEqual(1);
    expect(wrapper.find(".AlertContainer").length).toEqual(1);
  });
});
