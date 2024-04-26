const Customer = require('../model/customerSchema');
const Phone = require('../model/phoneSchema');
const OrderDetails = require('../model/orderDetailsSchema');
const { json } = require('express');

module.exports = {
    insertCustomer: (req,res,next)=>{
        let details = req.body;
        var newCustomer = new Customer(details);
        newCustomer.save()
        .then((customer)=>{
            res.send(customer)
        })
        .catch((err)=>{
            next(err);
        });
    },
    insertPhone: (req, res, next)=>{
        let details = req.body;
        var newPhone = new Phone(details);
        newPhone.save()
        .then((phone)=>{
            res.send(phone);
        })
        .catch((err)=>{
            next(err);
        });
    },
    insertOrder: (req, res, next)=>{
        let details = req.body;
        var newOrder = new OrderDetails(details);
        newOrder.save()
        .then((order)=>{
            res.send(order);
        })
        .catch((err)=>{
            console.log(err);
            next(err);
        });
    },
    findCustomer: (req, res, next)=>{
        let params = req.params;
        if(params._id===undefined){
            Customer.find({})
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
        else{
            Customer.find(params)
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
    },
    findPhone: (req, res, next)=>{
        let params = req.params;
        console.log(params);
        if(params._id ===undefined){
            Phone.find({})
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
        else{
            Phone.find(params)
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
    },
    findOrder: (req, res, next)=>{
        let params = req.params;
        console.log(params);
        if(params._id ===undefined){
            OrderDetails.find({})
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
        else{
            OrderDetails.find(params)
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
    },
    updateCustomer: async(req, res, next)=>{
        let details = req.body;
        console.log(details);
        let mobile = details.Phone;
        let email = details.Email;
        let title = details.Title;
        let address = details.Address;
        let shippingAddress = details.ShippingAddress
        let searchBy = req.params;

        if(mobile === null || email === null || title===null){
            res.send("Mobile, Email and Title required");
        }
        else if(mobile===undefined || email===undefined ||title===undefined){
            res.send("Mobile, Email and Title required");
        }
        else{
            let customer = null;

            if(searchBy._id===undefined || searchBy._id===null || searchBy._id===""){
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
                res.send(newCustomer);
            })
            .catch(err=>{
                next(err);
            })
        }
    },
    updatePhone: async(req, res, next)=>{
        let details = req.body;
        console.log(details);
        let searchBy = req.params;
        
            let phone = null;

            if(searchBy._id===undefined || searchBy._id===null || searchBy._id===""){
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
                    res.send(newPhone);
                });
            }catch(err){
                next(err);
            }
    },
    updateOrder: async(req, res, next)=>{
        let details = req.body;
        let searchBy = req.params;
            let order = null;

            if(searchBy._id===undefined || searchBy._id===null || searchBy._id===""){
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
                    res.send(newOrder);
                })
                .catch(err=>{
                    next(err);
                });
            }catch(err){
                next(err);
            } 
    },
    deleteCustomer: (req, res, next)=>{
        let details = req.body;
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
            res.send(result);
        })
        .catch(err=>{
            next(err);
        });
    },
    deletePhone: (req, res, next)=>{
        let details = req.body;
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
            res.send(result);
        })
        .catch(err=>{
            next(err);
        });
    },
    deleteOrder: (req, res, next)=>{
        let details = req.body;
        let query = req.params;
        console.log(query);
        OrderDetails.deleteMany(query)
        .then(result=>{
            res.send(result);
        })
        .catch(err=>{
            next(err);
        });
    },
    findCustomerOrderedPhone:(req,res,next)=>{
        let phoneID = req.params._id;
        console.log(phoneID);
        let customers = [];
        OrderDetails.find({order:phoneID})
        .then(results=>{
            for(let i in results){
                customers.push(results[i].customer);
            }
            res.send(customers);
        })
        .catch(err=>{
            next(err);
        });
    }
}