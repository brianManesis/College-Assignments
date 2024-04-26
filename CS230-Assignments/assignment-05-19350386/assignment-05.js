/*
    This assignment was tested using postman on ubuntu.
*/

const http = require('http');
const mongoose= require('mongoose');
const con = require('./assignment-05-connection');
const Customer = require("./assignment-05-Schema/customerSchema").Customer;
const Phone = require("./assignment-05-Schema/phoneSchema").Phone;
const OrderDetails = require('./assignment-05-Schema/orderDetailsSchema').OrderDetails;

const dburl = con.connection.database;

main();

async function main(){
    const con = await connectToMongoDB(dburl);

    const server = http.createServer((req,res)=>{
        let url = req.url.split("?")[0];
        let params = req.url.split("?")[1];
        res.setHeader("content-type","application/json");
        let body = "";
        req.on("data",(chunk)=>{
            body+=chunk;
        });
        //Create Customer
        //Handled by insertCustomer(details)
        if(url === "/customer" && req.method === "POST"){
            req.on("end",async()=>{
                try{
                    body = JSON.parse(body);
                    let newCustomer = await insertCustomer(body)
                    .then((val)=>{
                        console.log("Created Customer");
                        val = JSON.parse(JSON.stringify(val));
                        console.log(pretty(val));
                       res.end(pretty(val));
                    })
                    .catch((err)=>{
                        console.log("error creating customer, schema not followed");
                        res.end("error creating customer, schema not followed");
                    })
                }catch(err){
                    res.end("Problem with json");
                }
            });
        }
        //Create Phone
        //Handled by insertPhone(details)
        else if(url ==="/phone" && req.method === "POST"){
            req.on("end",async()=>{
                try{
                     body = JSON.parse(body);
                     let newPhone = await insertPhone(body)
                    .then((val)=>{
                        console.log("Created Phone");
                        val = JSON.parse(JSON.stringify(val));
                        console.log(pretty(val));
                        res.end(pretty(val));
                    })
                    .catch((err)=>{
                        console.log("error creating Phone, schema not followed");
                        res.end("error creating Phone, schema not followed");
                    })
                }catch(err){
                    res.end("Problem with json");
                }
            });
        }
        //Create order
        //Handled by insertOrder(details)
        else if(url==="/order" && req.method ==="POST"){
            req.on("end",async()=>{
                try{
                    body = JSON.parse(body);
                    let newOrder = await insertOrder(body)
                    .then((val)=>{
                        console.log("Created Order");
                        val = JSON.parse(JSON.stringify(val));
                        console.log(pretty(val));
                       res.end(pretty(val));
                    })
                    .catch((err)=>{
                        console.log("error creating Order, schema not followed");
                        res.end("error creating Order, schema not followed");
                    })
                }catch(err){
                    res.end("Problem with json");
                }
            });
        }
        //Retrieve Customer
        //Handled by findCustomer(details)
        else if(url ==="/customer" && req.method==="GET"){
                try{
                    let details= null;
                    if(params === undefined || params === null || params === ""){
                        details = false;
                    }
                    else{
                        details = params.split("&");
                    }
                    let customer = findCustomer(details)
                    .then(customer=>{
                        console.log("Retrieved Customer");
                       customer = JSON.parse(JSON.stringify(customer));
                       console.log(pretty(customer));
                       res.end(pretty(customer));
                    });
                }catch(err){
                    console.log("Problem with json");
                    res.end("Problem with json");
                }
        }
        //Retrieve Phone
        //Handled by findPhone(details)
        else if(url ==="/phone" && req.method ==="GET"){
            try{
                let details= null;
                    if(params === undefined || params === null || params === ""){
                        details = false;
                    }
                    else{
                        details = params.split("&");
                    }
                    let phone = findPhone(details)
                    .then(phone=>{
                        console.log("Retrieved Phone");
                        phone = JSON.parse(JSON.stringify(phone));
                        console.log(pretty(phone));
                        res.end(pretty(phone));
                    });
            }catch(err){
                console.log("Problem with json");
                res.end("Problem with json");
            }
        }
        //Retrieve Order
        //Handled by findOrder(details)
        else if(url==="/order" && req.method ==="GET"){
            try{
                let details= null;
                    if(params === undefined || params === null || params === ""){
                        details = false;
                    }
                    else{
                        details = params.split("&");
                    }
                    let order = findOrder(details)
                    .then(order=>{
                        console.log("Retrieved Order");
                        order = JSON.parse(JSON.stringify(order));
                        console.log(pretty(order));
                        res.end(pretty(order));
                    });
            }catch(err){
                console.log("Problem with json");
                res.end("Problem with json");
            }
        }
        //Update Customer
        //Handled by updateCustomer(details)
        else if(url === "/customer" && req.method === "PUT"){
            req.on("end",async()=>{
                try{
                    let updatedCustomer =await updateCustomer(JSON.parse(body));
                    console.log("Updated Customer");
                    updatedCustomer = JSON.parse(JSON.stringify(updatedCustomer));
                    console.log(pretty(updatedCustomer));
                    res.end(pretty(updatedCustomer));
                }catch(err){
                    console.log(err);
                    res.end(err);
                }
            })
        }
        //Update Phone
        //Handled by updatePhone(details)
        else if(url === "/phone" && req.method === "PUT"){
            req.on("end",async()=>{
                try{
                    let updatedPhone =await updatePhone(JSON.parse(body));
                    console.log("Updated Phone");
                    updatedPhone = JSON.parse(JSON.stringify(updatedPhone));
                    console.log(pretty(updatedPhone));
                    res.end(pretty(updatedPhone));                
                }catch(err){
                    console.log("error");
                    res.end("error");
                }
            })
        }
        //Update Order
        //Handled by updateOrder(details)
        else if(url === "/order" && req.method === "PUT"){
            req.on("end",async()=>{
                try{
                    let updatedOrder =await updateOrder(JSON.parse(body));
                    console.log("Updated Order");
                    updatedOrder = JSON.parse(JSON.stringify(updatedOrder));
                    console.log(pretty(updatedOrder));
                    res.end(pretty(updatedOrder));   
                }catch(err){
                    console.log("error");
                    res.end("error");
                }
            })
        }

        //Delete Customer
        //Handled by deleteCustomer(details)
        else if(url ==="/customer" && req.method ==="DELETE"){
            req.on("end",async()=>{
                try{
                    let result = await deleteCustomer(JSON.parse(body));
                    result = JSON.parse(JSON.stringify(result));
                    console.log(pretty(result));
                    res.end(pretty(result));
                }catch(err){
                    console.log(err);
                    res.end("Problem with Query");
                }
            })
        }

        //Delete Phone
        //Handled by deletePhone(details)
        else if(url ==="/phone" && req.method ==="DELETE"){
            req.on("end",async()=>{
                try{
                    let result = await deletePhone(JSON.parse(body));
                    result = JSON.parse(JSON.stringify(result));
                    console.log(pretty(result));
                    res.end(pretty(result));
                }catch(err){
                    console.log(err);
                    res.end("Problem with Query");
                }
            })
        }
        //Delete Order
        //Handled by deleteOrder(details)
        else if(url ==="/order" && req.method ==="DELETE"){
            req.on("end",async()=>{
                try{
                    let result = await deleteOrder(JSON.parse(body));
                    result = JSON.parse(JSON.stringify(result));
                    console.log(pretty(result));
                    res.end(pretty(result));
                }catch(err){
                    console.log(err);
                    res.end("Problem with Query");
                }
            })
        }
        else{
            res.writeHead(404,{"Content-Type":"text/plain"});
            res.end("Bad request");
        }
      });
     server.listen(5000);
}

//connect to mongodb given url
function connectToMongoDB(url){
    return new Promise((resolve,reject)=>{
        mongoose.connect(url)
        .then((connection)=>{
            resolve(connection);
        })
        .catch(err=>{
            reject(err);
        });
    })
}

//      Create customer body example
// {
//     "Title":"Dr", *
//     "FirstName":"test", *
//     "Surname":"test", *
//     "Mobile":"test", *
//     "Email":"michelle@yahoo.com", *
//     "Address":{  *
//         "AddressLine1":"13 cresent park", *
//         "AddressLine2":"Austin",
//         "Town":"Austin", *
//         "County_City":"Texas", *
//         "Eircode":""
//     },
//     "ShippingAddress":{ *
//         "AddressLine1":"13 cresent park", *
//         "AddressLine2":"Austin",
//         "Town":"Austin", *
//         "County_City":"Texas", *
//         "Eircode":""
//     }
// }
// All * fields required
function insertCustomer(details){
    return new Promise(async(resolve,reject)=>{
            var newCustomer = new Customer(details);
            newCustomer.save()
            .then((customer)=>{
                resolve(customer);
            })
            .catch((err)=>{
                reject(err);
            });
    });
}

//      Create phone body example
// {
//     "Manufacturer":"Apple",
//      "Model":"Iphone 10",
//      "Price":"800"
// }
function insertPhone(details){
    return new Promise(async(resolve,reject)=>{
        var newPhone = new Phone(details);
        var phone = await newPhone.save()
        .then((phone)=>{
            resolve(phone);
        })
        .catch((err)=>{
            reject(err);
        });
    });
}

//      Create order body example
// {
//     "customer":"6436ca1bfb26667218b45319",
//     "order":["64382a01424cb00f58a6e95f","64316b1930792b2fb64d4686"]
// }
function insertOrder(details){
    return new Promise(async(resolve,reject)=>{
        var newOrder = new OrderDetails(details);
        newOrder.save()
        .then((order)=>{
            resolve(order);
        })
        .catch((err)=>{
            console.log(err);
            reject(err);
        });
    });
}

//      Customer Retrieve url example
// localhost:5000/customer?FirstName=example&Surname=example
// params are optional if not included, random customer returned
function findCustomer(details){
    return new Promise((resolve,reject)=>{
        if(details===false){
            Customer.aggregate([{$sample: {size:1}}])
            .exec()
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
        }
        else{
            const query = {}
            for(let i of details){
                let key = i.split("=")[0];
                let temp = i.split("=")[1];
                let val = temp.replace("+"," ");
                query[key] = val;
            }
            Customer.find(query)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
        }
    });
}

//     Phone Retrieve url example
// localhost:5000/phone?Model=example&Price=example
// params are optional if not included, random phone returned
function findPhone(details){
    return new Promise((resolve,reject)=>{
        console.log({params:details});
        if(details ===false){
            Phone.aggregate([{$sample: {size:1}}])
            .exec()
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
        }
        else{
            const query = {}
            for(let i of details){
                let key = i.split("=")[0];
                let temp = i.split("=")[1];
                let val = temp.replace("+"," ");
                query[key] = val;
            }
            Phone.find(query)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
        }
    });
}
//     Order Retrieve url example
// localhost:5000/order?customer=643165c6752423f3926a984d
// params are optional if not included, random order returned
function findOrder(details){
    return new Promise((resolve,reject)=>{
        console.log({params:details});
        if(details ===false){
            OrderDetails.aggregate([{$sample: {size:1}}])
            .exec()
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
        }
        else{
            const query = {}
            for(let i of details){
                let key = i.split("=")[0];
                let temp = i.split("=")[1];
                let val = temp.replace("+"," ");
                query[key] = val;
            }
            OrderDetails.find(query)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
        }
    });
}

//      Update customer body example
// {
//     "SearchBy":{
//         "_id":"643165c6752423f3926a984d"
//     },
//     "Address": {
//             "AddressLine1": "",
//             "AddressLine2": "",
//             "Town": "",
//             "County_City":"",
//             "Eircode":""
//         },
//         "ShippingAddress": {
//             "AddressLine1": "",
//             "AddressLine2": "",
//             "Town": "",
//             "County_City":"",
//             "Eircode":"D25 6850"
//         },
//         "Title": "Mr",
//         "FirstName": "",
//         "Surname": "",
//         "Phone": "09584733",
//         "Email": "manesis@gmail.com"
// }
// SearchBy field is optional, if not included, random customer updated.
// Can search by any combination of _id, FirstName, Surname,Email, Mobile, Title.
// Address and ShippingAddress dont have to be included and each
// field with value "" can be included or left out without updating the document.
// Other Address & ShippingAddress fields filled in will get updated.
function updateCustomer(details){
    return new Promise(async(resolve,reject)=>{
        console.log(details);
        let mobile = details.Phone;
        let email = details.Email;
        let title = details.Title;
        let address = details.Address;
        let shippingAddress = details.ShippingAddress
        let searchBy = details.SearchBy;
        if(mobile === null || email === null || title===null){
            reject("Mobile, Email and Title required");
        }
        else if(mobile===undefined || email===undefined ||title===undefined){
            reject("Mobile, Email and Title required");
        }
        else{
            let customer = null;

            if(searchBy===undefined || searchBy===null || searchBy===""){
                let randomCustomer = await Customer.aggregate([{$sample: {size:1}}]);
                randomCustomer=randomCustomer[0];
                let customerId = randomCustomer._id;

                customer = await Customer.findById(customerId);
                console.log("Selected Customer");
                console.log(customer);
            }
            else{
                customer = await Customer.find(searchBy);
                customer = customer[0];
                console.log("Selected Customer");
                console.log(customer);

            }
            customer.Mobile=mobile;
            customer.Email = email;
            customer.Title = title;

            if(address!==undefined){
                for(let key in address){
                    if(address[key]!== ""){
                        customer.Address[key] = address[key];
                    }
                }
            }
            if(shippingAddress!==undefined){
                for(let key in shippingAddress){
                    if(shippingAddress[key]!==""){
                        customer.ShippingAddress[key] = shippingAddress[key];
                    }
                }
            }

            customer.save()
            .then(newCustomer=>{
                resolve(newCustomer);
            })
            .catch(err=>{
               reject("Problem updating customer");
            })
        }
    });
}
//      Update phone body
// {
//     "SearchBy":{
//          "Model":"Iphone 10"
//      },
//      "Manufacturer":"Apple",
//      "Model":"Iphone 11",
//      "Price":"1100"
// }
// SearchBy field is optional, if not included, random phone updated.
// can searchBy any combination of _id, Model, Manufacturer, Price
function updatePhone(details){
    return new Promise(async(resolve,reject)=>{
        console.log(details);
        let searchBy = details.SearchBy;
        
            let phone = null;

            if(searchBy===undefined || searchBy===null || searchBy===""){
                let randomPhone = await Phone.aggregate([{$sample: {size:1}}]);
                randomPhone=randomPhone[0];
                let phoneId = randomPhone._id;

                phone = await Phone.findById(phoneId);
                console.log("Selected Phone");
                console.log(phone);
            }
            else{
                phone = await Phone.find(searchBy);
                phone = phone[0];
                console.log("Selected Phone");
                console.log(phone);
            }
            try{
                for(let key in details){
                        if(key!=="SearchBy"){
                            phone[key] = details[key];
                        }
                }
    
                phone.save()
                .then(newPhone=>{
                    resolve(newPhone);
                });
            }catch(err){
                reject(err);
            }
            
    });
}
//      Update order body example
// {
//      "SearchBy": "64316c327f7eb1849d5eadbf",
//      "customer":"643165c6752423f3926a984d",
//      "order":[
//         "64316b0030792b2fb64d4684",
//         "64316b1930792b2fb64d4686"
//     ]
// }
// SearchBy field is optional, if not included, random order updated.
// Can only SearchBy _id of order.
function updateOrder(details){
    return new Promise(async(resolve,reject)=>{
        let searchBy = {
            _id:details.SearchBy
        };
            let order = null;

            if(searchBy===undefined || searchBy===null || searchBy===""){
                let randomOrder = await OrderDetails.aggregate([{$sample: {size:1}}]);
                randomOrder=randomOrder[0];
                let orderId = randomOrder._id;

                order = await OrderDetails.findById(orderId);
                console.log("Selected Order");
                console.log(order);
            }
            else{
                order = await OrderDetails.find(searchBy);
                order = order[0];
                console.log("Selected Order");
                console.log(order);
            }
            try{
                for(let key in details){
                        if(key!=="SearchBy"){
                            order[key] = details[key];
                        }
                }
    
                order.save()
                .then(newOrder=>{
                    resolve(newOrder);
                })
                .catch(err=>{
                    reject(err);
                });
            }catch(err){
                reject(err);
            }
            
    });
}

// Delete customer body example
// {
//     "Email":"example",
//     "Phone":"example",
//     "name":"firstname surname"
// }
// Deletes all customers matching specified Email,Phone and name
// name can be first and last name or just first name
function deleteCustomer(details){
    return new Promise((resolve,reject)=>{
        let firstName = details.name.split(" ")[0];
        let surname = details.name.split(" ")[1];
        let phone= details.Phone
        let email = details.Email;
        let query = null;

        if(surname === undefined || surname === null || surname ===""){
            query = {
                FirstName:firstName,
                Email: email,
                Mobile: phone
            }
        }
        else{
            query = {
                FirstName:firstName,
                Surname:surname,
                Email: email,
                Mobile: phone
            }
        }
        Customer.deleteMany(query)
        .then(result=>{
            resolve(result);
        })
        .catch(err=>{
            reject(err);
        });
    });
}

// Delete Phone body example
// {
//     "Manufacturer":"example",
//     "Model":"example",
//     "Price":"example"
// }
function deletePhone(details){
    return new Promise((resolve,reject)=>{
        let manufacturer = details.Manufacturer;
        let model= details.Model;
        let price = details.Price;
        let query = {
            Manufacturer:manufacturer,
            Model:model,
            Price: price,
        };
        console.log(query);
        Phone.deleteMany(query)
        .then(result=>{
            resolve(result);
        })
        .catch(err=>{
            reject(err);
        });
    });
}
// Delete Order body example
// {
//      orderId:64316c327f7eb1849d5eadbf
// }
// orderId is the _id field in OrderDetails
function deleteOrder(details){
    return new Promise((resolve,reject)=>{
        let orderId = details.orderId;
        let query = {
            _id:orderId
        };
        console.log(query);
        OrderDetails.deleteMany(query)
        .then(result=>{
            resolve(result);
        })
        .catch(err=>{
            reject(err);
        });
    });
}

// Parse json into more readable format.
function pretty(obj){
    let response = "";

    if(Array.isArray(obj)){
        for(let i in obj){
            response += pretty(obj[i]);
            response+= "\n";
        }
    }
    else{
        for(let key in obj){
            if(typeof(obj[key])==='object' && !Array.isArray(obj[key])){
                response += `${key}:-\n`+pretty(obj[key]);
            }
            else{
                response += `${key}: "${obj[key]}"\n`;
            }
        }
    }
    return response;
}


// To see the mongodb database design, view the schema folder which contains 
// the schema validation details for the three collections below.
//
// To view request body/url to server for crud activity, view example body/url
// above each request handle function, for example findCustomer(details).
//
// use Assignment5
// db.createCollection("Customer")
// db.createCollection("OrderDetails")
// db.createCollection("Phone")
//
//
//      Customer Database example document
// {
//     "FirstName":"Brian",
//     "Surname":"Manesis",
//     "Mobile":"09848473",
//     "Email":"manesisbrian@gmail.com",
//     "Address":{
//         "AddressLine1":"27 corbally glade",
//         "AddressLine2":"",
//         "Town":"Citywest",
//         "County_City":"Dublin",
//         "Eircode":"D24 NWF5"
//     },
//     "ShippingAddress":{
//         "AddressLine1":"27 corbally glade",
//         "AddressLine2":"",
//         "Town":"Citywest",
//         "County_City":"Dublin",
//         "Eircode":"D24 NWF5"
//     }
// }

//      Phone Database example document
// {
//     "Manufacturer":"Apple",
//     "Model":"Iphone 10",
//     "Price":"500"
// }

//      OrderDetails Database example document
// {
//     "customer":"customer_id",
//     "order": ["phone1_id","phone2_id","phone3_id"]
// }