process.env.NODE_ENV = "test";

const chai = require("chai");
const request = require("supertest");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

let server = require("../app");

describe("routes", () => {
    it("responds to /", (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("responds to everything else with 404", (done) => {
        chai.request(server)
            .get("/asddfgsfgsdfg")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
