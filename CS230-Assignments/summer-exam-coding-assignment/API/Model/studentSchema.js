const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Title:{
        type:String,
        enum:["Mx","Ms","Mr","Mrs","Miss","Dr","Other"],
        required:true
    },
    FirstName:{
        type:String,
        required:true,
        validate: {
            validator: function (name) {
                let regex = new RegExp("^[A-Z][a-z]+$");
                if(regex.test(name) && name.length <20){return true};
                return false;
            }
        }
    },   
    Surname:{ 
        type:String,
        required:true,
        validate: {
            validator: function (name) {
                let regex = new RegExp("^[A-Z][a-z]+$");
                if(regex.test(name) && name.length <20){return true};
                return false;
            }
        }
    },
    Phone:{
        type:String,
        required:true,
        validate: {
            validator: function (number) {
                let regex = new RegExp("^0[0-9]{9}$");
                if(regex.test(number) && number.length === 10){return true};
                return false;
            }
        }
    },
    EmailAddress:{
        type:String,
        required:true,
        validate: {
            validator: function (email) {
                let stringRegex = "^[a-zA-Z]+@[a-z]+\\.(com|ie|co\\.uk)$";
                let regex = new RegExp(stringRegex);
                if(regex.test(email) && email.length < 100){return true};
                return false;
            }
        }
    },
    DateOfBirth:{
        type:Date,
        required: true,
        min: '1960-01-01',
        max: '2010-01-01'
    },
    Parent_Guardian:{
        type: String,
        validate: {
            validator: function (val) {
              const student = this;
              let currentDate = new Date();
              let dob = new Date(student.DateOfBirth);
              if(currentDate.getFullYear()-dob.getFullYear() < 18){
                if(val === null || val === undefined || val === ""){
                    return false
                }
            }
              return true;
            }
          }
    },
    VirtualPermission:{
        type: Boolean,
        required: true
    },
    Gender:{
        type: String,
        required:true
    },
    Subject:{
        type:String
    },
    HomeAddress:{
        AddressLine1:{
            type:String,
            required:true,
            validate: {
                validator: function (Line1) {
                    let line1regex = new RegExp("^[0-9]+ .+$");
                    if(!line1regex.test(Line1)){return false};
                    return true;
              }
            }
        },
        AddressLine2:{
            type:String,
            validate: {
                validator: function (Line2) {
                    if(Line2 !== undefined && Line2 !== null && Line2 !== ""){
                        let line2regex = new RegExp("^[a-zA-Z]+$");
                        if(!line2regex.test(Line2)){return false};
                        return true;
                    }
                }
            }
        },
        Town:{
            type:String,
            required:true,
            validate: {
                validator: function (Town) {
                    let townregex = new RegExp("^[a-zA-z]+$");
                    if(!townregex.test(Town)){return false};
                    return true;
                }
            }
        },
        County_City:{
            type:String,
            required:true,
            validate: {
                validator: function (City) {
                    let countyregex = new RegExp("^[a-zA-z]+$");
                    if(!countyregex.test(City)){return false};
                    return true;
                }
            }
        },
        Eircode:{
            type:String,
            validate: {
                validator: function (Eircode) {
                    if(Eircode !== undefined && Eircode !== null && Eircode !== ""){
                        let eircodeRegex = new RegExp("^[A-Z][0-9][0-9] [A-Z0-9]{4}$");
                        if(!eircodeRegex.test(Eircode)){return false};
                    }
                    return true;
                }
            }
        }    
    }
},{ timestamps: true });

const Student = mongoose.model('Student',studentSchema,'Student');
module.exports = Student;