import { shallow } from "enzyme";
import React from "react";
import { RelatedVideos } from "../RelatedVideos";

describe("RelatedVideos", () => {
  test("renders", () => {
    const wrapper = shallow(<RelatedVideos />);
    expect(wrapper).toMatchSnapshot();
  });
});
