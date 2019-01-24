import { shallow } from "enzyme";
import React from "react";
import HeaderNav from "../HeaderNav";

test("renders HeaderNav", () => {
  const wrapper = shallow(<HeaderNav />);
  expect(wrapper).toMatchSnapshot();
});
