import React from "react";
import renderer from "react-test-renderer";
import AddDevices from "./AddDevices";

test("renders without crashing", () => {
	const tree = renderer.create(<AddDevices />).toJSON();
	expect(tree).toMatchSnapshot();
});
