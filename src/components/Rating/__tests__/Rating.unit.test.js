import { shallow } from "enzyme";
import React from "react";
import { Rating } from "../Rating";

describe("Rating", () => {
  test("renders", () => {
    const wrapper = shallow(<Rating />);
    expect(wrapper).toMatchSnapshot();
  });
});
