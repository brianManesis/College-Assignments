const validateTutor = (tutor)=>{
    if(!validateName(tutor.FirstName)){return false}
    if(!validateName(tutor.Surname)){return false}
    if(!validatePhoneNumber(tutor.Phone)){return false}
    if(!validateEmail(tutor.EmailAddress)){return false}
    if(!validateAddress(tutor.HomeAddress)){return false}
    return true;
}

function validateName(name){
    let regex = new RegExp("^[A-Z][a-z]+$");
    if(regex.test(name) && name.length <20){return true};
    return false;
}

function validatePhoneNumber(number){
    let regex = new RegExp("^0[0-9]{9}$");
    if(regex.test(number) && number.length === 10){return true};
    return false;
}
function validateEmail(email){
    let stringRegex = "^[a-zA-Z]+@[a-z]+\\.(com|ie|co\\.uk)$";
    let regex = new RegExp(stringRegex);
    if(regex.test(email) && email.length < 100){return true};
    return false;
}
function validateAddress(address){
    let line1regex = new RegExp("^[0-9]+ .+$");
    if(!line1regex.test(address.AddressLine1)){return false};
    
    let line2regex = new RegExp("^[a-zA-Z]+$");
    if(!line2regex.test(address.AddressLine2)){return false};

    let townregex = new RegExp("^[a-zA-z]+$");
    if(!townregex.test(address.Town)){return false};

    let countyregex = new RegExp("^[a-zA-z]+$");
    if(!countyregex.test(address.County_City)){return false};
    
    if(address.Eircode !== undefined && address.Eircode !== null && address.Eircode !== ""){
        let eircodeRegex = new RegExp("^[A-Z][0-9][0-9] [A-Z0-9]{4}$");
        if(!eircodeRegex.test(address.Eircode)){return false};
    }
    return true;
}

module.exports = validateTutor;