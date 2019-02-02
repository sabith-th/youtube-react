import { shallow } from "enzyme";
import React from "react";
import { Comment } from "../Comment";

describe("Comment", () => {
  test("renders Comment", () => {
    const wrapper = shallow(<Comment />);
    expect(wrapper).toMatchSnapshot();
  });
});
