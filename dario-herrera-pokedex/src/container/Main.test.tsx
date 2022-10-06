import { configure, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as componentHook from "./state/useMainState";
import { IUseMainState } from "./state/IUseMainState";
import { Main } from "./Main";
import { Spinner } from "../components/Spinner/Spinner";
import { Search } from "../components/Search/Search";
import { CardPokemonContainer } from "../components/CardPokemonContainer/CardPokemonContainer";
import { ResumePokemonSelected } from "../components/ResumePokemonSelected/ResumePokemonSelected";
import { FooterActions } from "../components/FooterActions/FooterActions";

configure({ adapter: new Adapter() });

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Main component unit test", () => {
  let wrapper: ShallowWrapper;
  let spy: jest.SpyInstance;
  let mockState: IUseMainState;

  const mockedHook = (mockValue: IUseMainState) => {
    spy = jest.spyOn(componentHook, "useMainState").mockReturnValue(mockValue);
  };

  beforeEach(() => {
    mockState = {
      isLoading: true,
    };

    mockedHook(mockState);

    wrapper = shallow(<Main />);
  });

  afterEach(() => {
    spy.mockClear();
    wrapper.unmount();
  });

  it("should render element that form part or Main container component when is called", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find(Spinner).length).toEqual(1);
    expect(wrapper.find("h1").length).toEqual(1);
    expect(wrapper.find("div").length).toEqual(2);
    expect(wrapper.find(Search).length).toEqual(1);
    expect(wrapper.find(CardPokemonContainer).length).toEqual(1);
    expect(wrapper.find(ResumePokemonSelected).length).toEqual(1);
    expect(wrapper.find(FooterActions).length).toEqual(1);
  });
});
