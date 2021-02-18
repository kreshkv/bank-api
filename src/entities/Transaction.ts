export interface Transaction {
  Id: number;
  AccountNo: number;
  AccountTo?: number;
  Amount: number;
  Type: TranferType;
  Date?: Date;
  Source?: string;
  TransferFrom?: TransferFrom;
  Description: string;
  IFSC?: string;
  Bank?: string;
  Transaction: string;
}

export enum TranferType {
  ATM = "ATM",
  NEFT = "NEFT",
  UPI = "UPI",
  SELF = "SELF",
}

export enum TransferFrom {
  SAMEBANK = "SAME_BANK",
  DIFFBANK = "DIFFERENT_BANK",
}
