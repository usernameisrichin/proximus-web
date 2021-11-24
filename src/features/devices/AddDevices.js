import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { deviceAdded } from "./deviceSlice";

export function AddDevices() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [model, setModel] = useState("");
	const [os, setOs] = useState("");
	const [owner, setOwner] = useState("");
	const [notes, setNotes] = useState("");
	const [error, setError] = useState(null);

	const handleModel = (e) => setModel(e.target.value);
	const handleOs = (e) => setOs(e.target.value);
	const handleOwner = (e) => setOwner(e.target.value);
	const handleNotes = (e) => setNotes(e.target.value);

	const deviceCount = useSelector((state) => state.devices.entities.length);

	const handleClick = () => {
		if (model && os && owner && notes) {
			dispatch(
				deviceAdded({
					id: deviceCount + 1,
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

		setModel("");
		setOs("");
		setOwner("");
		setError("");
	};

	return (
		<div className="content">
			<div className="row">
				<h1>Add Devices</h1>
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
						Add Device
					</button>
				</div>
			</div>
		</div>
	);
}
