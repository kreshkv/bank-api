import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { app } from "./../src/main";
import { Data } from "./data";

const route = "/api/v1/customer";
chai.use(chaiHttp);
const expect = chai.expect;

describe("Customer", () => {
  it("Invalid routing", () => {
    return chai
      .request(app)
      .get(route + "/unknownrouting")
      .then((res) => {})
      .catch((err) => {
        expect(err.status).to.equal(404);
      });
  });

  it("Add Customer", () => {
    return chai
      .request(app)
      .post(route)
      .send(Data.Customer)
      .then((res) => {
        expect(res.status).to.equal(201);
      });
  });

  it("Add Customer", () => {
    return chai
      .request(app)
      .post(route)
      .send(Data.Customer)
      .then((res) => {
        expect(res.status).to.equal(201);
      });
  });

  it("Add Account for Existing Customer", () => {
    return chai
      .request(app)
      .post(route)
      .send(Data.Customer)
      .then((res) => {
        expect(res.status).to.equal(201);
      });
  });

  it("Get Accounts By Customer ID", () => {
    return chai
      .request(app)
      .get(`${route}/1`)
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });

  it("Transfer Amount", () => {
    return chai
      .request(app)
      .post(`${route}/transfer`)
      .send(Data.TrasnferValid)
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });

  it("TransferInvalid Amount", () => {
    return chai
      .request(app)
      .post(`${route}/transfer`)
      .send(Data.TrasnferInValid)
      .then((res) => {
        expect(res.status).to.equal(500);
      });
  });
});
