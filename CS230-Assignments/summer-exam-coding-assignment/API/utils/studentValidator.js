const personalValidator = require('./tutorValidator');

const validateStudent = (student)=>{
    if(!personalValidator(student)){return false}
    if(!validateParent(student)){return false}
}

function validateParent(student){
    let today = new Date();
    let currentYear = today.getFullYear();
    console.log(currentYear);
    let date = student.DateOfBirth.getFullYear();
    if(currentYear-date<18 && Parent_Guardian !== undefined && Parent_Guardian !== null && Parent_Guardian !== ""){
        return false;
    }
    return true;
}

module.exports = validateStudent;