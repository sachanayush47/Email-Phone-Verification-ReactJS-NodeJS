import React, { useState } from 'react';
import axios from "axios";

function App() {

	const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
	const [networkResponse, setNetworkResponse] = useState(null);

	const onFormSubmit = async () => {

		const formData = {
			name: document.getElementById("name").value,
			email: document.getElementById("email").value,
			password: document.getElementById("password").value
		}

		if (formData.name.length === 0 || formData.email.length === 0 || formData.password.length === 0) {
			setNetworkResponse({ data: "Some feilds are empty" })
			return;
		}

		const res = await axios.post("http://localhost:8888/register", formData);
		console.log(res);
		if (res.status === 201) {
			setIsVerificationEmailSent(true);
		}
		setNetworkResponse(res);
	}

	const onOtpSubmit = async () => {

		const formData = {
			otp: document.getElementById("otp").value,
			email: document.getElementById("email").value
		}

		const res = await axios.post("http://192.168.0.105:8888/verify", formData);
		setNetworkResponse(res);
	}

	return (
		<div className="App">

			<h1>Email and Phone verification</h1>

			<input id="name" autoComplete="none" type="text" placeholder="Name" required />
			<input id="email" autoComplete="none" type="email" placeholder="Email or Phone" required />
			<input id="password" type="password" placeholder="Password" required />
			<button type="button" onClick={onFormSubmit}>Submit</button>

			{console.log(networkResponse)}

			{isVerificationEmailSent ?

				<div>

					<input id="otp" type="text" placeholder="Enter your OTP here." />
					<button onClick={onOtpSubmit}>Verify</button>

				</div> : ""

			}

			{networkResponse ? <h1>{networkResponse.data}</h1> : ""}

		</div>
	);
}

export default App;
