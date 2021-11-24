import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddDevices } from "./features/devices/AddDevices";
import { EditDevices } from "./features/devices/EditDevices";
import { DeviceList } from "./features/devices/DeviceList";
import DarkModeToggle from "./DarkModeToggle";
import "./styles.scss";

export default function App() {
	return (
		<div>
			{" "}
			<div className="navbar">
				<DarkModeToggle />
			</div>
			<Router>
				<div>
					<Switch>
						<Route path="/add-device">
							<AddDevices />
						</Route>
						<Route path="/edit-device">
							<EditDevices />
						</Route>
						<Route path="/">
							<DeviceList />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}
