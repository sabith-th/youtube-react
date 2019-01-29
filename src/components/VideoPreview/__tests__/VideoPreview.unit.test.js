import { shallow } from "enzyme";
import React from "react";
import { VideoPreview } from "../VideoPreview";

describe("Video Preview", () => {
  test("renders vertically", () => {
    const wrapper = shallow(<VideoPreview />);
    expect(wrapper).toMatchSnapshot();
  });
  test("renders horizontally", () => {
    const wrapper = shallow(<VideoPreview horizontal={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
