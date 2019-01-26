import { shallow } from "enzyme";
import React from "react";
import { VideoPreview } from "../VideoPreview";

describe("Video Preview", () => {
  test("renders", () => {
    const wrapper = shallow(<VideoPreview />);
    expect(wrapper).toMatchSnapshot();
  });
});
