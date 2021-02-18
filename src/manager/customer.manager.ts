import { Customer } from "../entities/Customer";
import {
  TranferType,
  Transaction,
  TransferFrom,
} from "../entities/Transaction";
import { TransactionManager } from "./transaction.manager";
export class CustomerManager {
  private customers: Customer[] = [];
  private transactionManager: TransactionManager;
  constructor() {
    this.transactionManager = new TransactionManager();
    if (!globalThis.customers) {
      globalThis.customers = this.customers;
    } else {
      this.customers = globalThis.customers;
    }
  }
  public addCustomer(customer: Customer): Customer {
    if (this.customers.length === 0) {
      customer.AccountNo = 100001;
      customer.CustomerId = 1;
    } else {
      const length = this.customers.length;
      customer.AccountNo = this.customers[length - 1].AccountNo + 1;
      customer.CustomerId =
        customer.CustomerId ?? this.customers[length - 1].CustomerId + 1;
      const transaction: Transaction = {
        Id: 0,
        Amount: customer.Amount,
        Date: new Date(),
        Description: "Initial Fund",
        Type: TranferType.SELF,
        AccountNo: customer.AccountNo,
        Transaction: "Credit",
      };
      this.transactionManager.addTransaction(transaction);
    }
    this.customers.push(customer);
    return customer;
  }

  public getAccountBalance(accountNo) {
    return this.customers.filter((tran) => tran.AccountNo === +accountNo);
  }

  public getAllAccountBalance(customerId) {
    return this.customers.filter((tran) => tran.CustomerId === +customerId);
  }

  public transfer(transaction: Transaction) {
    const fromCustomer = this.customers.find(
      (cust) => cust.AccountNo === transaction.AccountNo
    );
    if (fromCustomer.Amount < transaction.Amount) {
      return "Insufficient Fund";
    }

    /* Need to add transaction */

    if (transaction.TransferFrom === TransferFrom.SAMEBANK) {
      const toCustomer = this.customers.find(
        (cust) => cust.AccountNo === transaction.AccountTo
      );

      if (!toCustomer) {
        return "Invalid Reference Account";
      }

      fromCustomer.Amount -= transaction.Amount;
      transaction.Transaction = "Debit";

      this.transactionManager.addTransaction(transaction);
      transaction.Transaction = "Credit";
      toCustomer.Amount += transaction.Amount;
      transaction.AccountNo = transaction.AccountTo;
      this.transactionManager.addTransaction(transaction);
    }
    return "OK";
  }
}
