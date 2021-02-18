export const Data = {
  Customer: {
    Name: "Suresh",
    Mobile: "3432423423",
    Address: "5 annanagar",
    Amount: 15000,
  },
  ExistCustomer: {
    Name: "Suresh",
    Mobile: "3432423423",
    Address: "5 annanagar",
    Amount: 15000,
    CustomerId: 1,
  },
  TrasnferValid: {
    AccountNo: 100001,
    AccountTo: 100002,
    IFSC: "",
    Bank: "",
    TransferFrom: "SAME_BANK",
    Amount: 5000,
    Type: "NEFT",
    Description: "Bill settlement",
  },

  TrasnferInValid: {
    AccountNo: 100001,
    AccountTo: 100008,
    IFSC: "",
    Bank: "",
    TransferFrom: "SAME_BANK",
    Amount: 5000,
    Type: "NEFT",
    Description: "Bill settlement",
  },
};
