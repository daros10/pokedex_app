import { configure, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Spinner } from "./Spinner";

configure({ adapter: new Adapter() });

describe("Spinner component unit test", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Spinner />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render the component when is called", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("div").length).toEqual(2);
  });
});
