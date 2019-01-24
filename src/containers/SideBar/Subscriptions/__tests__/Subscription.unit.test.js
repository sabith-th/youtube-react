import { shallow } from "enzyme";
import React from "react";
import { Subscriptions } from "../Subscriptions";

test("renders Subscriptions", () => {
  const wrapper = shallow(<Subscriptions />);
  expect(wrapper).toMatchSnapshot();
});
