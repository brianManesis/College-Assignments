$('#Tutor').hide();
$('#Tutorial').hide();
$('#Student').hide();

$('input[type="radio"][name=Selector]').change(function(){
    let checked = document.querySelector("input[type='radio'][name=Selector]:checked").value;    ;
    if(checked === "student"){
        $('#Tutor').hide();
        $('#Tutorial').hide();
        $('#Student').show();
    }   
    else if(checked === "tutor"){
        $('#Tutor').show();
        $('#Tutorial').hide();
        $('#Student').hide();
    }    
    else if(checked === "tutorial"){
        $('#Tutor').hide();
        $('#Tutorial').show();
        $('#Student').hide();
    }    
});

$('#TutorCreateButton').click(function(){
    let address={
        AddressLine1: $('#Tutoraddress1').val(),
        AddressLine2:$('#Tutoraddress2').val(),
        Town:$('#Tutortown').val(),
        County_City:$('#TutorCountyCity').val(),
        Eircode:$('#TutorEircode').val()
    }
    let USERdetails = null;
    USERdetails = {
        Title: $('#Tutortitle').val(),
        FirstName:$('#TutorfirstName').val(),
        Surname: $('#Tutorsurname').val(),
        Phone: $('#Tutormobile').val(),
        EmailAddress: $('#Tutoremail').val(),        
        HomeAddress: address
    }
    let body = JSON.stringify(USERdetails);
    console.log(JSON.stringify(USERdetails));
    if(validateTutor(USERdetails)){
        $.ajax({
            type: "POST",
            url: 'http://localhost:5000/tutor',
            contentType: "application/json",
            dataType: 'json',
            async: true,
            data: body,
            success: function (){
            alert("Successfully added customer");
            },
            error: function(err){
            alert(err.responseText);
            }
        });
    }
    else{
        alert("Data Validation Failed");
    }
});

//when search button clicked
//get name from search box
//send as json post request 
//to url below
$('#TutorRetrieveButton').click(function(){
    $('#TutorTableBody > tr').remove();
    let id = $('#Tutorsearch').val();
    console.log(id);
    let url = 'http://localhost:5000/tutor'
    if(id !== null && id !== undefined){
        url = url+"/"+id;
    }
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: 'json',
        async: true,
        success: function (data){
            for(let i = 0; i< data.length; i++){
                let r = data[i];
                $('#TutorTableBody').append(`<tr><td>${r._id}</td><td>${r.Title}</td>
                <td>${r.FirstName}</td><td>${r.Surname}</td><td>${r.Phone}</td><td>${r.EmailAddress}</td>
                <td>${r.HomeAddress.AddressLine1}</td><td>${r.HomeAddress.AddressLine2}</td><td>${r.HomeAddress.Town}</td><td>${r.HomeAddress.County_City}</td>
                <td>${r.HomeAddress.Eircode}</td></tr>`);
            }
        },
        error: function(err){
        console.log(err);
        }
    });
});
$('#TutorUpdateButton').click(function(){
    let address={
        AddressLine1: $('#TutorUaddress1').val(),
        AddressLine2:$('#TutorUaddress2').val(),
        Town:$('#TutorUtown').val(),
        County_City:$('#TutorUCountyCity').val(),
        Eircode:$('#TutorUEircode').val()
    }
    let USERdetails = null;
    USERdetails = {
        Title: $('#TutorUtitle').val(),
        FirstName:$('#TutorUfirstName').val(),
        Surname: $('#TutorUsurname').val(),
        Phone: $('#TutorUmobile').val(),
        EmailAddress: $('#TutorUemail').val(),
        HomeAddress: address,
    }
    let id = $('#TutorUID').val();
    let url = 'http://localhost:5000/tutor'
    if(id !== null && id !== undefined){
        url = url+"/"+id;
    }
    let body = JSON.stringify(USERdetails);
    console.log(JSON.stringify(USERdetails));
    if(validateTutor(USERdetails)){
        $.ajax({
            type: "PUT",
            url: url,
            contentType: "application/json",
            dataType: 'json',
            async: true,
            data: body,
            success: function (data){
            alert("Successfully Updated Tutor");
            },
            error: function(err){
            alert(err.responseText);
            }
        });
    }
    else{
        alert("Data Validation Failed");
    }
});
$('#TutorDeleteButton').click(function(){
    let id = $('#TutorDID').val();
    let url = 'http://localhost:5000/tutor'
    if(id !== null && id !== undefined){
        url = url+"/"+id;
    }
    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json",
        dataType: 'json',
        async: true,
        success: function (){
        alert("Successfully Deleted Tutor");
        },
        error: function(err){
        alert(err.responseText);
        }
    });
});
//Student requests
$('#StudentCreateButton').click(function(){
    let virtualCheck = document.querySelector("input[type='radio'][name=Virtual]:checked");
    if(virtualCheck==="true"){
        virtualCheck = true;
    }
    else{
        virtualCheck = false;
    }
    let address={
        AddressLine1: $('#Studentaddress1').val(),
        AddressLine2:$('#Studentaddress2').val(),
        Town:$('#Studenttown').val(),
        County_City:$('#StudentCountyCity').val(),
        Eircode:$('#StudentEircode').val()
    }
    let USERdetails = null;
    USERdetails = {
        Title: $('#Studenttitle').val(),
        FirstName:$('#StudentfirstName').val(),
        Surname: $('#Studentsurname').val(),
        Phone: $('#Studentmobile').val(),
        EmailAddress: $('#Studentemail').val(),
        DateOfBirth:$('#StudentDOB').val(),
        Parent_Guardian:$('#StudentParent').val(),
        VirtualPermission:virtualCheck,
        Gender:$('#StudentGender').val(),
        Subject:$('#Studentsubject').val(),
        HomeAddress: address
    }
    let body = JSON.stringify(USERdetails);
    console.log(JSON.stringify(USERdetails));
    if(validateStudent(USERdetails)){
        $.ajax({
            type: "POST",
            url: 'http://localhost:5000/student',
            contentType: "application/json",
            dataType: 'json',
            async: true,
            data: body,
            success: function (){
            alert("Successfully added customer");
            },
            error: function(err){
            alert(err.responseText);
            }
        });
    }
    else{
        alert("Data Validation Failed");
    }
});

//when search button clicked
//get name from search box
//send as json post request 
//to url below
$('#StudentRetrieveButton').click(function(){
    $('#StudentTableBody > tr').remove();
    let id = $('#Studentsearch').val();
    console.log(id);
    let url = 'http://localhost:5000/student'
    if(id !== null && id !== undefined){
        url = url+"/"+id;
    }
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: 'json',
        async: true,
        success: function (data){
            for(let i = 0; i< data.length; i++){
                let r = data[i];
                $('#StudentTableBody').append(`<tr><td>${r._id}</td><td>${r.Title}</td>
                <td>${r.FirstName}</td><td>${r.Surname}</td><td>${r.Phone}</td><td>${r.EmailAddress}</td>
                <td>${r.DateOfBirth}</td><td>${r.Parent_Guardian}</td><td>${r.VirtualPermission}</td>
                <td>${r.Gender}</td><td>${r.Subject}</td>
                <td>${r.HomeAddress.AddressLine1}</td><td>${r.HomeAddress.AddressLine2}</td><td>${r.HomeAddress.Town}</td><td>${r.HomeAddress.County_City}</td>
                <td>${r.HomeAddress.Eircode}</td></tr>`);
            }
        },
        error: function(err){
        console.log(err);
        }
    });
});
$('#StudentUpdateButton').click(function(){
    let virtualCheck = document.querySelector("input[type='radio'][name=UVirtual]:checked");
    if(virtualCheck==="true"){
        virtualCheck = true;
    }
    else{
        virtualCheck = false;
    }
    let address={
        AddressLine1: $('#StudentUaddress1').val(),
        AddressLine2:$('#StudentUaddress2').val(),
        Town:$('#StudentUtown').val(),
        County_City:$('#StudentUCountyCity').val(),
        Eircode:$('#StudentUEircode').val()
    }
    let USERdetails = null;
    USERdetails = {
        Title: $('#StudentUtitle').val(),
        FirstName:$('#StudentUfirstName').val(),
        Surname: $('#StudentUsurname').val(),
        Phone: $('#StudentUmobile').val(),
        EmailAddress: $('#StudentUemail').val(),
        DateOfBirth:$('#StudentUDOB').val(),
        Parent_Guardian:$('#StudentUParent').val(),
        VirtualPermission:virtualCheck,
        Gender:$('#StudentUGender').val(),
        Subject:$('#StudentUsubject').val(),
        HomeAddress: address
    }
    let id = $('#StudentUID').val();
    let url = 'http://localhost:5000/student'
    if(id !== null && id !== undefined){
        url = url+"/"+id;
    }
    let body = JSON.stringify(USERdetails);
    console.log(JSON.stringify(USERdetails));
    if(validateStudent(USERdetails)){
        $.ajax({
            type: "PUT",
            url: url,
            contentType: "application/json",
            dataType: 'json',
            async: true,
            data: body,
            success: function (data){
            alert("Successfully Updated Student");
            },
            error: function(err){
            alert(err.responseText);
            }
        });
    }
    else{
        alert("Data Validation Failed");
    }
});
$('#StudentDeleteButton').click(function(){
    let id = $('#StudentDID').val();
    let url = 'http://localhost:5000/student'
    if(id !== null && id !== undefined){
        url = url+"/"+id;
    }
    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json",
        dataType: 'json',
        async: true,
        success: function (){
        alert("Successfully Deleted Student");
        },
        error: function(err){
        alert(err.responseText);
        }
    });
});
//tutorial requests
$('#TutorialCreateButton').click(function(){
    let studentString = $('#Students').val();
    let students = studentString.split(',');
    USERdetails = {
        Date: $('#TutorialDate').val(),
        Time:$('#TutorialTime').val(),
        Students: students,
        Tutor: $('#TutorialTutor').val(),
        Fee: $('#TutorialFee').val(),        
        TutorialAttendence: $('#TutorialAttendence').val(),
        TutorialSubject: $('#TutorialSubject').val(),
        TutorialNotes: $('#TutorialNotes').val()
    }
    let body = JSON.stringify(USERdetails);
    console.log(JSON.stringify(USERdetails));
    if(validateTutorial(USERdetails)){
        $.ajax({
            type: "POST",
            url: 'http://localhost:5000/tutorial',
            contentType: "application/json",
            dataType: 'json',
            async: true,
            data: body,
            success: function (){
            alert("Successfully added Tutorial");
            },
            error: function(err){
            alert(err.responseText);
            }
        });
    }
    else{
        alert("Data Validation Failed");
    }
});

$('#TutorialRetrieveButton').click(function(){
    $('#TutorialTableBody > tr').remove();
    let id = $('#Tutorialsearch').val();
    console.log(id);
    let url = 'http://localhost:5000/tutorial'
    if(id !== null && id !== undefined){
        url = url+"/"+id;
    }
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: 'json',
        async: true,
        success: function (data){
            for(let i = 0; i< data.length; i++){
                let r = data[i];
                $('#TutorialTableBody').append(`<tr><td>${r._id}</td>
                <td>${r.Date}</td><td>${r.Time}</td><td>${r.Students}</td>
                <td>${r.Tutor}</td><td>${r.Fee}</td><td>${r.TutorialAttendence}</td>
                <td>${r.TutorialSubject}</td><td>${r.TutorialNotes}</td>
                </tr>`);
            }
        },
        error: function(err){
        console.log(err);
        }
    });
});
$('#TutorialUpdateButton').click(function(){
    let studentString = $('#UStudents').val();
    let students = studentString.split(',');
    USERdetails = {
        Date: $('#UDate').val(),
        Time:$('#UTime').val(),
        Students: students,
        Tutor: $('#UTutorialTutor').val(),
        Fee: $('#UFee').val(),        
        TutorialAttendence: $('#UTutorialAttendence').val(),
        TutorialSubject: $('#UTutorialSubject').val(),
        TutorialNotes: $('#UTutorialNotes').val()
    }
    let id = $('#TutorialUID').val();
    let url = 'http://localhost:5000/tutorial'
    if(id !== null && id !== undefined){
        url = url+"/"+id;
    }
    let body = JSON.stringify(USERdetails);
    console.log(JSON.stringify(USERdetails));
    if(validateTutorial(USERdetails)){
        $.ajax({
            type: "PUT",
            url: url,
            contentType: "application/json",
            dataType: 'json',
            async: true,
            data: body,
            success: function (data){
            alert("Successfully Updated Tutorial");
            },
            error: function(err){
            alert(err.responseText);
            }
        });
    }
    else{
        alert("Data Validation Failed");
    }
});
$('#TutorialDeleteButton').click(function(){
    let id = $('#TutorialDID').val();
    let url = 'http://localhost:5000/tutorial'
    if(id !== null && id !== undefined){
        url = url+"/"+id;
    }
    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json",
        dataType: 'json',
        async: true,
        success: function (){
        alert("Successfully Deleted Tutorial");
        },
        error: function(err){
        alert(err.responseText);
        }
    });
});

function validateTutor(tutor) {
    if (!validateName(tutor.FirstName)) {console.log("1"); return false} 
    if (!validateName(tutor.Surname)) { console.log("2");return false} 
    if (!validatePhoneNumber(tutor.Phone)) { console.log("3");return false} 
    if (!validateEmail(tutor.EmailAddress)) { console.log("4");return false} 
    if (!validateAddress(tutor.HomeAddress)) { console.log("5");return false} 
    return true
}
function validateStudent(student){
    let currentDate = new Date();
    let dob = new Date(student.DateOfBirth);
    if(!validateTutor(student)){return false;}
    if(currentDate.getFullYear()-dob.getFullYear() < 18){
        if(student.Parent_Guardian === null || student.Parent_Guardian === undefined || student.Parent_Guardian === ""){
            return false
        }
    }
    return true;
}
function validateTutorial(tutorial){
    let students = tutorial.Students;
    let timeRegEx = new RegExp("^([01][0-9]|2[0-3]):([0-5][0-9])$");
    if(!timeRegEx.test(tutorial.Time)){return false;}
    let feeRegEx = new RegExp("^[0-9]+\\.[0-9][0-9]$");
    if(!feeRegEx.test(tutorial.Fee)){return false;}
    if(students.length < 1 || students.length>5){return false}
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
    
    if(address.AddressLine2 !== undefined && address.AddressLine2 !== null && address.AddressLine2 !== ""){
        let line2regex = new RegExp("^[a-zA-Z]+$");
        if(!line2regex.test(address.AddressLine2)){return false};
    }
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