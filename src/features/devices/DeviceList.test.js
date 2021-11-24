import React from "react";
import renderer from "react-test-renderer";
import DeviceList from "./DeviceList";

test("renders without crashing", () => {
	const tree = renderer.create(<DeviceList />).toJSON();
	expect(tree).toMatchSnapshot();
});
