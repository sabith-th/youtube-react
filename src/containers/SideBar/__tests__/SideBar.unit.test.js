import { shallow } from "enzyme";
import React from "react";
import { SideBar } from "../SideBar";

test("renders SideBar", () => {
  const wrapper = shallow(<SideBar />);
  expect(wrapper).toMatchSnapshot();
});
