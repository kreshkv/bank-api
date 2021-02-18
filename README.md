Add Customer 
  POST :  localhost:5000/api/v1/customer

         Payload {
            "Name":"Suresh",
            "Mobile":"3432423423",
            "Address":"5 annanagar",
            "Amount":15000
        }
        Response: {
            "Name": "Suresh",
            "Mobile": "3432423423",
            "Address": "5 annanagar",
            "Amount": 15000,
            "AccountNo": 100001,
            "CustomerId": 2
        }
        
Add Account to existing Customer 
  POST :  localhost:5000/api/v1/customer

         Payload {
            "Name":"Suresh",
            "Mobile":"3432423423",
            "Address":"5 annanagar",
            "Amount":15000,
             "CustomerId": 2
        }
       
 To View Account Details. 
  GET: localhost:5000/api/v1/customer/account/100001.
    
          Response: 
          [
              {
                  "Name": "Suresh",
                  "Mobile": "3432423423",
                  "Address": "5 annanagar",
                  "Amount": 15000,
                  "AccountNo": 100001,
                  "CustomerId": 2
              }
          ]

To View all the Account of the customer.
  GET: localhost:5000/api/v1/customer/1.
  
          Response: 
          [
              {
                  "Name": "Suresh",
                  "Mobile": "3432423423",
                  "Address": "5 annanagar",
                  "Amount": 15000,
                  "AccountNo": 100000,
                  "CustomerId": 1
              }
          ]

Amount Transfer
  POST localhost:5000/api/v1/customer/transfer.
  
        Payload :{
            "AccountNo":100003,
            "AccountTo":100004,
            "IFSC":"",
            "Bank":"",
            "TransferFrom":"SAME_BANK",
            "Amount":15000,
            "Type":"NEFT",
            "Description":"Bill settlement"
        }



I haved used the globalThis for storing the Customer and Transaction Details.

Added Joi validation for the add customer.

The Authentication and Authorization not handled. 

To Run 

  npm run start
  
Testing
  Mocha chai
  Run 
    npm run test.






