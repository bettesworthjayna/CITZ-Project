//
// Copyright © 2022 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/**
 * Application entry point
 * @author [Jayna Bettesworth](bettesworthjayna@gmail.com)
 * @module
 */

import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function App() {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate();
	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				password,
			}),
		})

		const data = await response.json()
		console.log(data)

		 if (data.user) {
		 	localStorage.setItem('token', data.user)
		 	alert('Login Successful')
		 	navigate('/dashboard')
		 } else {
		 	alert('Please check your username and password and try again')
		 }
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="name"
					placeholder="ID"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<br/>
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}

export default App