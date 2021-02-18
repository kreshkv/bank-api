import { Router, Request, Response, NextFunction } from "express";
import { AppRoute } from "../app-route";
import { Customer } from "../entities";
import { Api } from "../helpers";
import { CustomerManager } from "../manager/customer.manager";

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
