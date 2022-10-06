import { configure, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as componentHook from "./state/useFooterActionState";
import { IUseFooterActionState } from "./state/IUseFooterActionState";
import { FooterActions } from "./FooterActions";

configure({ adapter: new Adapter() });

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("FooterActions component unit test", () => {
  let wrapper: ShallowWrapper;
  let spy: jest.SpyInstance;
  let mockState: IUseFooterActionState;

  const mockedHook = (mockValue: IUseFooterActionState) => {
    spy = jest
      .spyOn(componentHook, "useFooterActionState")
      .mockReturnValue(mockValue);
  };

  beforeEach(() => {
    mockState = {
      isEnableNextButton: true,
      isEnableBackButton: false,
      handleClickBackButton: jest.fn(),
      handleClickNextButton: jest.fn(),
    };

    mockedHook(mockState);

    wrapper = shallow(<FooterActions />);
  });

  afterEach(() => {
    spy.mockClear();
    wrapper.unmount();
  });

  it("should render FooterActions when is called", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("button").length).toEqual(2);
  });
});
