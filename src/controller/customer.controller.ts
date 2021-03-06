import { Router, Request, Response } from "express";
import { AppRoute } from "../app-route";
import { Api } from "../helpers";
import { CustomerManager } from "../manager/customer.manager";
import * as joi from "joi";

export class CustomerController implements AppRoute {
  public route = "/customer";
  public router: Router = Router();
  constructor() {
    this.router.post("/", this.addCustomer);
    this.router.get("/:customerId", this.getAllAccountBalance);
    this.router.get("/account/:accountNo", this.getAccountBalance);
    this.router.post("/transfer", this.transfer);
  }

  private addCustomer(request: Request, response: Response) {
    const schema = joi
      .object()
      .keys({
        Name: joi.string().min(3),
        Address: joi.string().required(),
        Mobile: joi.string().min(10),
        Amount: joi.number().min(5000),
      })
      .validate(request.body).error;

    if (schema) {
      return Api.badRequest(request, response, schema.details);
    }
    const newCustomer = new CustomerManager().addCustomer(request.body);
    return Api.created(request, response, newCustomer);
  }

  private getAllAccountBalance(request: Request, response: Response) {
    const accounts = new CustomerManager().getAllAccountBalance(
      request.params.customerId
    );
    return Api.ok(request, response, accounts);
  }

  private getAccountBalance(request: Request, response: Response) {
    const accounts = new CustomerManager().getAccountBalance(
      request.params.accountNo
    );
    return Api.ok(request, response, accounts);
  }

  private transfer(request: Request, response: Response) {
    const message = new CustomerManager().transfer(request.body);
    if (message === "OK") return Api.ok(request, response, message);
    return Api.serverError(request, response, message);
  }
}
