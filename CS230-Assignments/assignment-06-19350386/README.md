API endpoint examples:

/customer
http://localhost:5000/customer
POST
{
    "Title":"Mr",
    "FirstName":"Michael",
    "Surname":"Jones",
    "Mobile":"055843332",
    "Email":"michael@yahoo.com",
    "Address":{
        "AddressLine1":"16 moon avenue",
        "AddressLine2":"Machetuessus",
        "Town":"Boston",
        "County_City":"Boston",
        "Eircode":""
    },
    "ShippingAddress":{
        "AddressLine1":"13 cresent park",
        "AddressLine2":"Austin",
        "Town":"Austin",
        "County_City":"Texas",
        "Eircode":""
    }
}

GET
http://localhost:5000/customer/6436ca1bfb26667218b45319

PUT
http://localhost:5000/customer/6436ca1bfb26667218b45319
{
    "Address": {
            "AddressLine1": "11 sun lane",
            "AddressLine2": "",
            "Town": "",
            "County_City":"",
            "Eircode":""
        },
        "ShippingAddress": {
            "AddressLine1": "",
            "AddressLine2": "",
            "Town": "",
            "County_City":"",
            "Eircode":""
        },
        "Title": "Mrs",
        "FirstName": "",
        "Surname": "",
        "Phone": "1234567",
        "Email": "aoifeH@gmail.com"
}

DELETE
http://localhost:5000/customer
{
     "Email":"michael@yahoo.com",
    "Phone":"055843332",
    "name":"Michael Jones"
}

/phone

POST
http://localhost:5000/phone
{
    "Manufacturer":"Toshiba",
     "Model":"tosh 10",
     "Price":"600"
}

GET
http://localhost:5000/phone/643bde7f832ce8c1a222fadc

PUT
http://localhost:5000/phone/643bde7f832ce8c1a222fadc
{
  "Model":"Iphone 13",
  "Price":1300
}

DELETE
http://localhost:5000/phone
{
    "Manufacturer":"Toshiba",
     "Model":"tosh 10",
     "Price":"600"
}

/order
POST
http://localhost:5000/order
{
    "customer":"643821674f02c322d543f8d3",
    "order":["643bde7f832ce8c1a222fadc","64383cdf2ee45f2f6c4b55f1","64382a01424cb00f58a6e95f","64316b1930792b2fb64d4686","64316b0030792b2fb64d4684"]
}

GET
http://localhost:5000/order/64382ab6424cb00f58a6e968

PUT
http://localhost:5000/order/64382ab6424cb00f58a6e968
{
     "order":[
        "643bde7f832ce8c1a222fadc",
        "643bde7f832ce8c1a222fadc",
        "64316b1930792b2fb64d4686",
        "643bde7f832ce8c1a222fadc",
        "643bde7f832ce8c1a222fadc"
    ]
}

DELETE
http://localhost:5000/order/644d00059e058ae453be59dc




