import { shallow } from "enzyme";
import React from "react";
import { HomeContent } from "../HomeContent";

describe("HomeContent", () => {
  test("renders", () => {
    const wrapper = shallow(<HomeContent />);
    expect(wrapper).toMatchSnapshot();
  });
});
