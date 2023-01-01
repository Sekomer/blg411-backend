import request from "supertest";
import { describe } from "node:test";

import app from "../app";

describe("POST /register", function () {
	it("responds with json", function (done) {
		request(app)
			.post("/register")
			.send({
				username: "john",
				password: "123456",
				height: 180,
				weight: 80,
				age: 20,
				sex: "male",
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
});

describe("POST /login", function () {
	it("responds with json", function (done) {
		request(app)
			.post("/login")
			.send({
				username: "mahmut123",
				password: "mahmut",
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
});

describe("GET /health-check", function () {
	it("responds with json", function (done) {
		request(app)
			.get("/health-check")
			.expect("Content-Type", /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
});

describe("POST /foods", function () {
	it("responds with json", function (done) {
		request(app)
			.post("/foods")
			.send({
				name: "makarna",
				carbs: 32123412,
				protein: 6421341,
				fiber: -2341,
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
});

describe("GET /all-users", function () {
	it("responds with json", function (done) {
		request(app)
			.get("/all-users")
			.expect("Content-Type", /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
});

describe("DELETE /foods", function () {
	it("responds with json", function (done) {
		request(app)
			.delete("/foods")
			.set("Accept", "application/json")
			.query({ id: "639917c99c663eea9d572352" })
			.expect("Content-Type", /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
});
