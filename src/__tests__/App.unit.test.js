import { shallow } from "enzyme";
import React from "react";
import App from "../App";

describe("App", () => {
  test("renders", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
