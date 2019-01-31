import { shallow } from "enzyme";
import React from "react";
import { Watch } from "../Watch";

describe("Watch", () => {
  test("renders", () => {
    const wrapper = shallow(<Watch />);
    expect(wrapper).toMatchSnapshot();
  });
});
