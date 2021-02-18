import { Transaction } from "../entities/Transaction";

export class TransactionManager {
  private transactions: Transaction[] = [];
  constructor() {
    if (!globalThis.transactions) {
      globalThis.transaction = this.transactions;
    } else {
      this.transactions = globalThis.transactions;
    }
  }

  public addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  public getTransaction(accountNo) {
    return this.transactions.filter((tran) => tran.AccountNo === accountNo);
  }
}
