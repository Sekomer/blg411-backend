const axios = require("axios");

const baseUrl = "http://localhost:5000";

// starter, create admin if not exists
let jwt = "";
let username = "admin";
let insertedId = "";

axios
	.post(`${baseUrl}/register`, {
		username: username,
		password: "CORRECTHORSEBATTERYSTAPLE",
		height: 183,
		weight: 93,
		age: 23,
		sex: "male",
	})
	.then((res) => {
		jwt = res.data.token;
	})
	.catch((err) => console.log(err.status));

// login existing user
axios
	.post(`${baseUrl}/login`, {
		username: username,
		password: "CORRECTHORSEBATTERYSTAPLE",
	})
	.then((res) => console.log(res.status))
	.catch((err) => console.log(err));

// login random user, will return error if user does not exist
axios
	.post(`${baseUrl}/login`, {
		username: "USER" + Math.floor(Math.random() * 1000),
		password: "PASSWORD" + Math.floor(Math.random() * 1000),
	})
	.then((res) => console.log(res.status))
	.catch((err) => console.log(err.status));

// register random user
axios
	.post(`${baseUrl}/register`, {
		username: "USER" + Math.floor(Math.random() * 1000),
		password: "PASSWORD" + Math.floor(Math.random() * 1000),
		height: Math.random() * 100,
		weight: Math.random() * 100,
		age: Math.floor(Math.random()),
		sex: "male",
	})
	.then((res) => console.log(res.status))
	.catch((err) => console.log(err.status));

// register already existing user, will return error
axios
	.post(`${baseUrl}/register`, {
		username: username,
		password: "CORRECTHORSEBATTERYSTAPLE",
		height: 183,
		weight: 93,
		age: 23,
		sex: "male",
	})
	.then((res) => console.log(res.status))
	.catch((err) => console.log(err.status));

// Get All Food in System without authentication
axios
	.get(`${baseUrl}/foods/all-users`)
	.then((res) => console.log(res.status))
	.catch((err) => console.log(err.status));

// get all food in system with authentication
axios
	.get(`${baseUrl}/foods/all-users`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	})
	.then((res) => console.log(res.status))
	.catch((err) => console.log(err.status));

// get all users in system
axios
	.get(`${baseUrl}/users/all-users`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	})
	.then((res) => console.log(res.status))
	.catch((err) => console.log(err.status));

// Add Food To the System
axios
	.post(
		`${baseUrl}/foods/`,
		{
			name: "makarna",
			carbs: 32123412,
			protein: 6421341,
			fiber: -2341,
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	)
	.then((res) => {
		insertedId = res.data.insertedId;
		console.log(res.status);
	})
	.catch((err) => console.log(err.status));

// delete food from system
axios
	.delete(`${baseUrl}/foods/${insertedId}`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	})
	.then((res) => console.log(res.status))
	.catch((err) => console.log(err.status));

// update food from system
axios
	.put(
		`${baseUrl}/foods/${insertedId}`,
		{ fat: 31 },
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	)
	.then((res) => console.log(res.status))
	.catch((err) => console.log(err.status));
