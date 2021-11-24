import React from "react";
import renderer from "react-test-renderer";
import EditDevices from "./EditDevices";

test("renders without crashing", () => {
	const tree = renderer.create(<EditDevices />).toJSON();
	expect(tree).toMatchSnapshot();
});
