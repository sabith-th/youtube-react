import { shallow } from "enzyme";
import React from "react";
import { SideBarFooter } from "../SideBarFooter";

test("renders SideBarFooter", () => {
  const wrapper = shallow(<SideBarFooter />);
  expect(wrapper).toMatchSnapshot();
});
