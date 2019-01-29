import { shallow } from "enzyme";
import React from "react";
import { Video } from "../Video";

describe("Video", () => {
  test("renders video component correctly", () => {
    const wrapper = shallow(<Video id="HAuXJVI_bUs" />);
    expect(wrapper).toMatchSnapshot();
  });

  test("renders null if id in video component not specified", () => {
    const wrapper = shallow(<Video />);
    expect(wrapper).toMatchSnapshot();
  });
});
