import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { deviceDeleted } from "./deviceSlice";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export function DeviceList() {
	const dispatch = useDispatch();

	const { entities } = useSelector((state) => state.devices);
	const loading = useSelector((state) => state.loading);

	const handleDelete = (id) => {
		dispatch(deviceDeleted({ id }));
	};
	//: states
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);

	// export related
	const headers = [
		{ label: "Model", key: "model" },
		{ label: "OS", key: "os" },
		{ label: "Owner", key: "owner" },
		{ label: "Notes", key: "notes" },
	];
	const csvReport = {
		data: entities,
		headers: headers,
		filename: "Device_list.csv",
	};

	// import related funtions
	const processData = (dataString) => {
		const dataStringLines = dataString.split(/\r\n|\n/);
		const headers = dataStringLines[0].split(
			/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
		);

		const list = [];
		for (let i = 1; i < dataStringLines.length; i++) {
			const row = dataStringLines[i].split(
				/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
			);
			if (headers && row.length === headers.length) {
				const obj = {};
				for (let j = 0; j < headers.length; j++) {
					let d = row[j];
					if (d.length > 0) {
						if (d[0] === '"') d = d.substring(1, d.length - 1);
						if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
					}
					if (headers[j]) {
						obj[headers[j]] = d;
					}
				}

				// remove the blank rows
				if (Object.values(obj).filter((x) => x).length > 0) {
					list.push(obj);
				}
			}
		}

		// prepare columns list from headers
		const columns = headers.map((c) => ({
			name: c,
			selector: c,
		}));

		setData(list);
		setColumns(columns);
	};

	// handle file upload
	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (evt) => {
			/* Parse data */
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
			processData(data);
		};
		reader.readAsBinaryString(file);
	};

	return (
		<div className="content">
			<div className="row">
				<h1>Device List</h1>
			</div>
			<div className="row">
				<div className="two columns">
					<Link to="/add-device">
						<button className="button-primary">Add Device</button>
					</Link>
				</div>
			</div>
			{/* export */}
			<div className="row">
				<CSVLink {...csvReport}>Export to CSV</CSVLink>
			</div>
			{/* import */}
			<div className="row">
				<input
					type="file"
					accept=".csv,.xlsx,.xls"
					onChange={handleFileUpload}
				/>
				<DataTable pagination highlightOnHover columns={columns} data={data} />
			</div>

			<div className="row">
				{loading ? (
					"Loading..."
				) : (
					<table className="u-full-width">
						<thead>
							<tr>
								<th>ID</th>
								<th>Model</th>
								<th>OS</th>
								<th>Owner</th>
								<th>Notes</th>
							</tr>
						</thead>
						<tbody>
							{entities.length &&
								entities.map(({ id, model, os, owner, notes }, i) => (
									<tr key={i}>
										<td>{id}</td>
										<td>{model}</td>
										<td>{os}</td>
										<td>{owner}</td>
										<td>{notes}</td>
										<td>
											<button onClick={() => handleDelete(id)}>Delete</button>
											<Link to={`/edit-device/${id}`}>
												<button>Edit</button>
											</Link>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
