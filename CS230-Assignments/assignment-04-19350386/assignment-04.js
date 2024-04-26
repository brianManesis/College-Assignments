/*
    Tested with postman sending raw json in the form seen below.
*/

const http = require('http');
const fs = require('fs');
var mysql = require("mysql");
const titles = new Set(["Mr","Mrs","Ms","Miss","Mx","Dr","Other"])

const homePage = fs.readFileSync("./assignment-04.html");
var con = mysql.createConnection({
    host: "webcourse.cs.nuim.ie",
    user: "u200246",
    password: "ahquizaF9quoopha",
    database: "cs230_u200246"
  });

  //create the server
const server = http.createServer( (req,res)=>{
    const path = req.url;
    const url = path.toString().split("?")[0];
    //allow cors for all domains
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT,DELETE");
    //if root return the forum page html
    if(url ==="/"){
        res.writeHead(200, {'content-type':'text/html'});
        res.write(homePage);
        res.end();
    }
    //if path is /create and its a post request 
   else if(url==="/create" && req.method === "POST"){
    //if content type is json
        if(req.headers["content-type"] ==="application/json"){
            let body ="";
            req.on("data",(data)=>{
                body = body +data.toString();
            });
            req.on("end",async()=>{
                let id = null;
                //try handle the create request
                try{
                    id = await handleCreateRequest(body);
                }
                //if error return 400 status code
                catch(err){
                    res.writeHead(400,{"content-type":"text/html"});
                    console.log("Failed to add customer, make sure all required details are filled in.");
                    res.end("Failed to add customer, make sure all required details are filled in.");
                }
                //if invalid title infrom user
                if(id==="Invalid Title"){
                    console.log(id);
                    res.end(id);
                }
                //otherwise infrom user that customer was created and give them
                //their id
                else{
                    console.log(`Added customer with id: ${id}`);
                    res.end(`Added customer with id: ${id}`);
                }
            });
        }
   }
   //if retrieve request and method is post
   else if(url === "/retrieve" && req.method === "POST"){
    //if content type is json
        if(req.headers["content-type"] ==="application/json"){
            res.writeHead(200, {'content-type':'application/json'});
            let body = "";
            req.on("data",(data)=>{
                body = body +data.toString();
            });
            req.on("end", async ()=>{
                //once body loaded handle the retireve request
                let responseArray = await handleRetrieveRequest(body);
                let responseJSON = JSON.stringify(responseArray);
                console.log(responseJSON);
                res.end(responseJSON);
            });
        }
   }
      //if update request and method is put
   else if(url ==="/update" && req.method === "PUT"){
        if(req.headers["content-type"] ==="application/json"){
            res.writeHead(200, {'content-type':'application/json'});
            let body = "";
            req.on("data",(data)=>{
                body = body +data.toString();
            });
            req.on("end", async ()=>{
                let response;
                //once body loaded try handle update request
                try{
                    response = await handleUpdateRequest(body);
                }
                //if error inform user
                catch(err){
                    console.log("Failed to update customer, Make sure shipping filled in if new.");
                    res.end("Failed to update customer, Make sure shipping filled in if new.")
                }
                //otherwise return response json
                console.log(response);
                res.end(response);
            });
        }
   }
     //if update delete and method is delete
   else if(url ==="/delete" && req.method ==="DELETE"){
        if(req.headers["content-type"] ==="application/json"){
            let body = "";
            req.on("data",(data)=>{
                body = body +data.toString();
            });
            //once body loaded handle delete request
            req.on("end", async ()=>{
                try{
                handleDeleteRequest(body);
                }catch(err){
                    res.end("Failed to delete customer");
                }
                res.end("Successfully deleted customer.");
            });
        }
   }
   //invalid path
    else{
        res.writeHead(404,{'content-type':'text/html'})
        res.write("<h1>page not found</h1>")
        res.end();
    }
});

server.listen(5000);


//      Create request Body:
// {
//     "Personal":{
//         "Title": "Mr",
//         "FirstName":"Brian",
//         "SurName":"Manesis",
//         "Mobile":"0831316281",
//         "EmailAddress":"manesisbrian@gmail.com"
//     },
//     "Address":{
//         "Address_Line_1":"27 corbally glade",
//         "Address_Line_2":"",
//         "Town":"Dublin",
//         "County_City":"Dublin",
//         "Eircode":"D24 NWF5"
//     },
//     "ShippingAddress":{
//         "Address_Line_1":"27 corbally glade",
//         "Address_Line_2":"",
//         "Town":"Dublin",
//         "County_City":"Dublin",
//         "Eircode":"D24 NWF5"
//     }
// }
    // The create request method takes in the body in json format as shown above 
    // It first creates the customer record from the personal detais and the address from the address details
    // it then checks if the if shipping address is the same as the address
    // if it is it just creates 1 relation record from customer to address and makes this records isShipping true
    // if not it creates an address from the shipping address details and makes 2 relation records from customer to address
    // 1 for customer to address and makes this records isShipping to false
    // and another for customer to the shipping address and makes this records isShipping true

async function handleCreateRequest(body){
    let reqObject = JSON.parse(body);
    let per = reqObject.Personal;
    let addr = reqObject.Address
    let shipAddr = reqObject.ShippingAddress;
  
    if(!titles.has(per.Title)){
        return "Invalid Title";
    }
    var sqlCustomer = `INSERT INTO Customer (Title, FirstName, LastName, Mobile, EmailAddress) VALUES (${checkData(per.Title)}, ${checkData(per.FirstName)}, ${checkData(per.SurName)}, ${checkData(per.Mobile)}, ${checkData(per.EmailAddress)});`;
    var sqlAddress = `INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES (${checkData(addr.Address_Line_1)}, ${checkData(addr.Address_Line_2)}, ${checkData(addr.Town)}, ${checkData(addr.County_City)}, ${checkData(addr.Eircode)});`;
    var sqlShipAddress = `INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES (${checkData(shipAddr.Address_Line_1)}, ${checkData(shipAddr.Address_Line_2)}, ${checkData(shipAddr.Town)}, ${checkData(shipAddr.County_City)}, ${checkData(shipAddr.Eircode)});`;
    
    let customerID = await sqlCreateQuery(sqlCustomer);
    let addressID = await sqlCreateQuery(sqlAddress);
    
    if(compareObjects(shipAddr,addr)){
        var sqlCustomerAddresses = `INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES (${customerID},${addressID},1);`;
        con.query(sqlCustomerAddresses,function(err,result){
            if (err) throw err;
        });
    }
    else{
        let shipAddressID = await sqlCreateQuery(sqlShipAddress);
        
        var sqlCustomerAddresses1 = `INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES ("${customerID}","${addressID}",0);`;
        var sqlCustomerAddresses2 = `INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES ("${customerID}","${shipAddressID}",1);`;

        con.query(sqlCustomerAddresses1,function(err,result){
            if (err) throw err;
        });
        con.query(sqlCustomerAddresses2,function(err,result){
            if (err) throw err;
        });
    }
    return customerID;
}


//      Retrieve request Body:
//      {"Name": "Bri"}
    // the retrieve request takes a body in json format as shown above
    // it selects all customers matching the name value in the json object,
    // for each customer it returns,
    // it finds the address records the current customer has relation to
    // and forms a customer information object and adds this to a list
    // once this is done it returns the array to the server connection that caused it

async function handleRetrieveRequest(body){
    let reqObject = JSON.parse(body);
    let name = reqObject.Name;
    let firstName = name.split(" ")[0];
    let surName = name.split(" ")[1]!=undefined ?  name.split(" ")[1]: "";
    var customersInformation = [];

    var customerSql = `Select * FROM Customer WHERE FirstName LIKE "${firstName}%" AND LastName LIKE "${surName}%";`;
    let customers = await sqlRetrieveQuery(customerSql);
    
    for(let customer of customers) {
        let customerAddressesSql = `Select * FROM CustomerAddresses WHERE CustomerID = '${customer.CustomerID}';`
        let customerAddresses = await sqlRetrieveQuery(customerAddressesSql);
        let addr = null;
        let shipAddr = null;

        if(customerAddresses.length == 1){
           var addrSql = `Select * FROM Address WHERE AddressID = '${customerAddresses[0].AddressID}';`
           let customerAddress = await sqlRetrieveQuery(addrSql);

           addr = JSON.parse(JSON.stringify(customerAddress[0]));
           shipAddr = JSON.parse(JSON.stringify(customerAddress[0]));
        }
        else if(customerAddresses.length == 2){
            var addrSql1 = `Select * FROM Address WHERE AddressID = '${customerAddresses[0].AddressID}';`;
            var addrSql2 = `Select * FROM Address WHERE AddressID = '${customerAddresses[1].AddressID}';`;
            let customerAddress1 = await sqlRetrieveQuery(addrSql1);
            let customerAddress2 = await sqlRetrieveQuery(addrSql2);

            if(customerAddresses[0].isShipping === 0){
                addr = JSON.parse(JSON.stringify(customerAddress1[0]));
                shipAddr = JSON.parse(JSON.stringify(customerAddress2[0]));
            }
            else{
                addr = JSON.parse(JSON.stringify(await sqlRetrieveQuery(addrSql2)));
                shipAddr = JSON.parse(JSON.stringify(await sqlRetrieveQuery(addrSql1)));
            }
        }
        let customerInformation = {
            Personal: customer,
            Address: addr,
            ShippingAddress: shipAddr
        };
        customersInformation.push(customerInformation);
    };
    return customersInformation;
}

//         Update request body
// {
//             "CustomerID": "1",
//             "Personal":{
//                 "Title" : "Dr",
//                 "Mobile" : "0842748193",
//                 "EmailAddress": "brianmanesis@gmail.com"
//             },
//             "Address":{
//                 "Address_Line_1":"27 corbally glade",
//                 "Address_Line_2":"",
//                 "Town":"Dublin",
//                 "County_City":"Dublin",
//                 "Eircode":"D24 NWF5"
//             },
//             "ShippingAddress":{
//                 "Address_Line_1":"27 corbally heath",
//                 "Address_Line_2":"",
//                 "Town":"Dublin",
//                 "County_City":"Dublin",
//                 "Eircode":""
//             }
// }
    // The update request takes in a body in json format as seen above
    // it updates a certain user with the specified customerID as above
    // it checks if the address and shipping address are the same
    // it builds the address update sql based on the filled in values of the body Object
    // it checks how many addresses the specified customer has
    // and updates/inserts/deletes addresses based on this and if the address and shipping
    // are the same
    // it then updates the customer

async function handleUpdateRequest(body){
    let reqObject = JSON.parse(body);
    let customerID = reqObject.CustomerID;
    let shipAddr = reqObject.ShippingAddress;
    let sameShipping = compareObjects(reqObject.Address, reqObject.ShippingAddress);
    let CustomerAddresses = await sqlRetrieveQuery(`Select * FROM CustomerAddresses WHERE CustomerID="${customerID}";`);
    let numCustomerAddresses = CustomerAddresses.length;
    if(!titles.has(reqObject.Personal.Title)){
        return "Invalid Title";
    }
    var customerSql = `UPDATE Customer SET Title=${checkData(reqObject.Personal.Title)}, Mobile=${checkData(reqObject.Personal.Mobile)}, EmailAddress=${checkData(reqObject.Personal.EmailAddress)} WHERE CustomerID=${checkData(customerID)};`;
    var addressSql = buildUpdateSql(reqObject.Address);
    var shipAddressSql = buildUpdateSql(reqObject.ShippingAddress);
    
    if(numCustomerAddresses ==1){
        let addressID = CustomerAddresses[0].AddressID;
        
        if(!sameShipping){
            let sqlChangeOldShippingAddress = `UPDATE CustomerAddresses SET isShipping=0 WHERE CustomerID="${customerID}"`;
            await sqlRetrieveQuery(sqlChangeOldShippingAddress);

            let shipAddressInsertSql= `INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES (${checkData(shipAddr.Address_Line_1)}, ${checkData(shipAddr.Address_Line_2)}, ${checkData(shipAddr.Town)}, ${checkData(shipAddr.County_City)}, ${checkData(shipAddr.Eircode)})`;
            let newShipAddressID = await sqlCreateQuery(shipAddressInsertSql);
         
            let sqlNewShipAddress = `INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES ("${customerID}","${newShipAddressID}",1);`;
            await sqlCreateQuery(sqlNewShipAddress);
        }
        if(addressSql!==0){
            addressSql += ` WHERE AddressID = "${addressID}";`
            await sqlRetrieveQuery(addressSql);
        }
    }
    else{
        let addressID;
        let shipAddressID;
        if(CustomerAddresses[0].isShipping ===0){
            addressID = CustomerAddresses[0].AddressID;
            shipAddressID = CustomerAddresses[1].AddressID;
        }
        else{
            addressID = CustomerAddresses[1].AddressID;
            shipAddressID = CustomerAddresses[0].AddressID;
        }
        
        if(!sameShipping && addressSql!==0 && shipAddressSql!==0){
            shipAddressSql += ` WHERE AddressID = "${shipAddressID}"`;
            addressSql+= ` WHERE AddressID = "${addressID}"`;
            await sqlRetrieveQuery(addressSql);
            await sqlRetrieveQuery(shipAddressSql);
        }
        else if(sameShipping && shipAddressSql!==0){
            shipAddressSql += ` WHERE AddressID = "${shipAddressID}"`;
            await sqlRetrieveQuery(shipAddressSql);
            await sqlRetrieveQuery(`DELETE FROM Address WHERE AddressID="${addressID}"`);
        }
    }
    await sqlRetrieveQuery(customerSql);
    return "Succesfully updated customer."
}

//      Delete request body
// {
//     "Name": "Aoife",
//     "Phone":"0861218536",
//     "Email": "aoifeHarr@yahoo.com"
// }
    // The delete request takes in json data as seen above
    // It then gets all the customers matching this data
    // for each customer
    // it gets the customers addresses and deletes each address
    // then deletes all the customers

async function handleDeleteRequest(body){
    let reqObject = JSON.parse(body);
    let name = reqObject.Name;
    let Mobile = reqObject.Phone;
    let EmailAddress = reqObject.Email;
    let conditions = `FirstName = "${name}" AND Mobile="${Mobile}" AND EmailAddress="${EmailAddress}";`;
    let customerids = [];
    let customers = await sqlRetrieveQuery(`SELECT CustomerID FROM Customer WHERE `+conditions);
    for(let customer of customers){
        customerids.push(customer.CustomerID);
        let customerAddresses = await sqlRetrieveQuery(`SELECT AddressID FROM CustomerAddresses WHERE CustomerID="${customer.CustomerID}";`);
        for(let address of customerAddresses){
            let addressDeleteSql = `DELETE FROM Address WHERE AddressID="${address.AddressID}";`;
            let addresses = await sqlRetrieveQuery(addressDeleteSql);
        }
    }
    let deleteCustomerSql = `DELETE FROM Customer WHERE `+conditions;
    let cust = await sqlRetrieveQuery(deleteCustomerSql);
}
function sqlCreateQuery(query){
    return new Promise((resolve,reject)=>{
        con.query(query,function(err,result){
            if(err){
                reject(err);
            }
            else{
                resolve(result.insertId);
            }
        });
    });
}
function sqlRetrieveQuery(query){
    return new Promise((resolve,reject)=>{
        con.query(query,function(err, result){
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}
function compareObjects(obj1,obj2){
    if(JSON.stringify(obj1)===JSON.stringify(obj2)){
        return true;
    }
    return false;
}

function buildUpdateSql(address){
    let sql = `UPDATE Address SET `;
    for (const [key, value] of Object.entries(address)) {
        if(address[key] !== null && address[key]!==""){
            sql+=`${key} = "${value}",`
        }   
    }
    if(sql ===`UPDATE Address SET `){
        return 0;
    }
    let finishedSql = sql.substring(0,sql.length-1); 
    return finishedSql;
}
function checkData(string){
    if(string==="" || string==null){
        return null;
    }
    else{
        return `"${string}"`;
    }
}