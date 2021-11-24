import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { deviceUpdated } from "./deviceSlice";

export function EditDevices() {
	const { pathname } = useLocation();
	const deviceId = parseInt(pathname.replace("/edit-device/", ""));
	console.log(deviceId);

	const devices = useSelector((state) =>
		state.devices.entities.find((device) => device.id === deviceId)
	);

	const dispatch = useDispatch();
	const history = useHistory();

	const [model, setModel] = useState(devices.model);
	const [os, setOs] = useState(devices.os);
	const [owner, setOwner] = useState(devices.owner);
	const [notes, setNotes] = useState(devices.notes);
	const [error, setError] = useState(null);

	const handleModel = (e) => setModel(e.target.value);
	const handleOs = (e) => setOs(e.target.value);
	const handleOwner = (e) => setOwner(e.target.value);
	const handleNotes = (e) => setNotes(e.target.value);

	const handleClick = () => {
		if (model && os && owner && notes) {
			dispatch(
				deviceUpdated({
					id: deviceId,
					model,
					os,
					owner,
					notes,
				})
			);

			setError(null);
			history.push("/");
		} else {
			setError("Fill in all fields");
		}
	};

	return (
		<div className="content">
			<div className="row">
				<h1>Edit Devices</h1>
			</div>
			<div className="row">
				<div className="three columns">
					<label htmlFor="nameInput">Model *</label>
					<input
						className="u-full-width"
						type="text"
						placeholder="OnePlus"
						id="modelInput"
						onChange={handleModel}
						value={model}
					/>
					<label htmlFor="emailInput">OS *</label>
					<input
						className="u-full-width"
						type="text"
						placeholder="iOS"
						id="osInput"
						onChange={handleOs}
						value={os}
					/>
					<label htmlFor="emailInput">Current Owner *</label>
					<input
						className="u-full-width"
						type="text"
						placeholder="owner"
						id="ownerInput"
						onChange={handleOwner}
						value={owner}
					/>
					<label htmlFor="emailInput">Notes *</label>
					<input
						className="u-full-width"
						type="text"
						placeholder="notes"
						id="notesInput"
						onChange={handleNotes}
						value={notes}
					/>
					{error && error}
					<button onClick={handleClick} className="button-primary">
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
