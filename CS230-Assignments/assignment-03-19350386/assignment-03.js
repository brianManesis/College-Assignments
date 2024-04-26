/*
    Helped by : w3schools.com
    Tested on chrome on linux   
    All main html elements needed
*/
const table = document.getElementById("Table");
const addRowButton = document.getElementById("addRow");
const addColButton = document.getElementById("addCol");
const submissionCount = document.getElementById("submissionCount");
const undoButton = document.getElementById("Undo");
const saveButton = document.getElementById("save");
const studentNames = ['Jack Higgins','Cathal Murphy','Danny Murphy','Jack Griffiths',
                     'Caleb Griffiths','Dylan Dumfry','Cara Moore', 'Kim Barry', 'Joan Barry',
                     'Ciara Barry'];
var students = [];
var lastSave =[];
var saves = [];
var studentNumber = 1;
var averageFormat = 0;

/*
    Student class to easily make student objects
*/
class Student{
    constructor(name,studentNumber){
        this.name = name;
        this.studentNumber = studentNumber;
        this.assignment1 = '-';
        this.assignment2 = '-';
        this.assignment3 = '-';
        this.assignment4 = '-';
        this.assignment5 = '-';
        this.average = '-';
    }
}

// Making 10 students from student names above
for(var i=0; i<10; i++){
    students.push(new Student(studentNames[i],studentNumber))
    studentNumber++;
}
//create table from student array and create a first save
setTable(students);
lastSave = students.map(student => Object.assign(new Student(), student));
saves.push(lastSave);
const averageCol = document.getElementById("Average");

//set table function takes an array of students and makes a suitable html table
function setTable(studentArray){
    table.innerHTML = "";
    let firstRow = document.createElement("tr");
    Object.entries(studentArray[0]).forEach(([key, val]) => {
        var currentCol= document.createElement("th");
        if(key=="name"){
            currentCol.id = "Col0";
            currentCol.innerHTML = "Student Name";
        }
        else if(key == "studentNumber"){
            currentCol.id = "Col1";
            currentCol.innerHTML = "Student ID";
        }
        else if(key == "average"){
            currentCol.id = "Average";
            currentCol.innerHTML = "Average [%]";
        }
        else{
            currentCol.id = key;
            let num = key.charAt(key.length-1);
            currentCol.innerHTML = "Assignment "+num;
        }
        currentCol.style.backgroundColor="#606060";
        firstRow.appendChild(currentCol);
    });
    table.appendChild(firstRow);
    for(let i = 0; i<studentArray.length;i++){
        let id = studentArray[i].studentNumber;
        let currentRow = document.createElement("tr");
        currentRow.id = "r"+id;
        Object.entries(studentArray[i]).forEach(([key, val]) => {
            var currentCol;
            if(key=="name" || key == "studentNumber"){
                currentCol = document.createElement("th");
                currentCol.innerHTML = val;
                currentCol.style.textAlign = "left"
            }
            else if(key == "average"){
                currentCol = document.createElement("th");
                currentCol.id = "Average"+id;
                currentCol.placeholder = val;
                currentCol.innerHTML = val;
                if(val == '-'){
                    currentCol.style.backgroundColor = 'yellow';
                }
                else{
                    currentCol.style.backgroundColor = "initial";
                    currentCol.style.textAlign = "right";
                }
            }
            else{
                currentCol = document.createElement("th");
                currentCol.id = "a"+id;
                let currentColInput = document.createElement("input");
                currentColInput.id = "i"+id;
                currentColInput.type = "number";
                currentColInput.placeholder = val;
                currentColInput.value = val;
                if(val!='-'){
                    currentColInput.style.textAlign = "right";
                }
                if(val == '-'){
                    currentCol.style.backgroundColor = 'yellow';
                }
                else{
                    currentCol.style.backgroundColor = "initial";
                    currentCol.style.textAlign = "right";
                }
                currentCol.appendChild(currentColInput);
            }
            currentRow.appendChild(currentCol);
        });
        table.appendChild(currentRow);
    }
    
    addEventToInputs();
}

//Add event listener function to add event listeners to all html input tags
function addEventToInputs(){
    const cells = document.querySelectorAll('input');
    cells.forEach((c)=>c.addEventListener('change',function(){
        let rowIndex = c.closest('tr').rowIndex;
        c.value = newValue(c.value);
        const row = document.querySelectorAll("#"+c.id);
        updateAverage(row,rowIndex);
        updateSubmissionCount();
        if(c.value != ''){
            c.style.textAlign= "right";
            c.parentElement.style.backgroundColor = "initial";
            updateStudentGrade(c.parentElement,c.value,rowIndex);
        }
       else{
            c.style.textAlign= "center";
            c.parentElement.style.backgroundColor = "yellow";
       }
    }));
}
//Event listener to change average format
averageCol.addEventListener("click",()=>{
    if(averageFormat == 0){
        averageCol.innerHTML = "Average [Letter]";
        averageFormat = 1;
        
        for(var i=1;i<=students.length;i++){
            var currentAverage = document.getElementById("Average"+i);
            if(currentAverage.innerHTML != "-"){
                currentAverage.innerHTML = percentToLetter(students[i-1].average);
            }
        }
    }
    else if(averageFormat == 1){
        averageCol.innerHTML = "Average [4.0]";
        averageFormat = 2;

        for(var i=1;i<=students.length;i++){
            var currentAverage = document.querySelector("#Average"+i);
            if(currentAverage.innerHTML != "-"){
                currentAverage.innerHTML = letterTofourPointZero(students[i-1].average);
            }        
        }
    }
    else{
        averageCol.innerHTML = "Average [%]";
        averageFormat = 0;

        for(var i=1;i<=students.length;i++){
            var currentAverage = document.querySelector("#Average"+i);
            if(currentAverage.innerHTML != "-"){
                currentAverage.innerHTML = students[i-1].average+"%";
            }
        }
}
});
//Add row button event listener
addRowButton.addEventListener("click",()=>{
    let newStudentName = prompt("Please enter new Students name");
    if(newStudentName != null){
        let id = students.length+1;
        let newStudent = new Student(newStudentName,id); 
        students.push(newStudent);
        let newRow = document.createElement("tr");
        newRow.id = "r"+id;
        Object.entries(students[0]).forEach(([key, val]) => {
            var newCol;
            newCol = document.createElement("th");
            if(key=="name"){
                newCol.innerHTML = newStudentName;
                newCol.style.textAlign = "left"
                newRow.appendChild(newCol);
            }
            else if(key == "studentNumber"){
                newCol.innerHTML = id;
                newCol.style.textAlign = "left"
                newRow.appendChild(newCol);
            }
            else{
                if(key!="average"){
                    newStudent[key] = '-';
                    newCol.id = "a"+id;
                    let newColInput = document.createElement("input");
                    newColInput.id = "i"+id;
                    newColInput.type = "number";
                    newColInput.placeholder = "-";
                    newCol.appendChild(newColInput);
                    newRow.appendChild(newCol);
                }
               
                newCol.style.backgroundColor = 'yellow';
            
            }
        });
        let avgCol = document.createElement("th");
        avgCol.style.backgroundColor = "yellow";
        avgCol.id = "Average"+id;
        avgCol.placeholder = "-";
        avgCol.innerHTML = "-";
        newRow.appendChild(avgCol);
        table.appendChild(newRow);
    }
    studentNumber++;
    updateSubmissionCount();
    addEventToInputs();
});
//Add column button event listener
addColButton.addEventListener("click",()=>{
    var assignmentNumber = getAssingmentNumber()+1;
    let key = "assignment"+assignmentNumber;
    for(let i = 0; i<students.length;i++){
        students[i][key] = '-';
    }
    let rows = table.rows;
    for(let i = 0; i<rows.length;i++){
        let tableCell = rows[i].insertCell(assignmentNumber+1);
        if(i==0){
            tableCell.style.backgroundColor = "#606060";
        }
        tableCell.style.fontFamily = "sans-serif";
        tableCell.style.fontWeight = "900";
        let id = i;

        if(i==0){
            tableCell.id = "assignment"+assignmentNumber;
            tableCell.innerHTML = "Assignment "+assignmentNumber;
        }
        else{
            tableCell.id = "a"+id;
            tableCell.style.backgroundColor = "yellow";
            let inputCell = document.createElement("input");
            inputCell.id = "i"+id;
            inputCell.type = "number";
            inputCell.placeholder = '-';
            tableCell.appendChild(inputCell);
        }
    }
    updateSubmissionCount();
    addEventToInputs();
});

undoButton.addEventListener("click",()=>{
    if(saves.length>0){
        students = saves.pop();
        setTable(students);
        updateSubmissionCount();
    }
})
saveButton.addEventListener("click",()=>{
    lastSave = [];
    lastSave = students.map(student => Object.assign(new Student(), student));
    saves.push(lastSave);
})
//Function to update average field of a certain row
function updateAverage(row,id){
    var sum=0;
    var count=0;
    for(var i = 0; i<row.length; i++){
        var currentValue = parseInt(row[i].value);
        

        if(!isNaN(currentValue)){
            sum = sum+ currentValue;
            count++;
        }
    }
    var average = Math.round(sum/count);
    if(isNaN(average)){
        average = '-';
        document.getElementById(`Average${id}`).innerHTML = average+"";
    } 
    students[id-1].average = average;
    
    if(averageFormat == 0 && average!='-'){
        document.getElementById(`Average${id}`).innerHTML = average+"%";
    }
   
    else if(averageFormat ==1){
        average = percentToLetter(average);
        document.getElementById(`Average${id}`).innerHTML = average+"";
    }
    else if(averageFormat == 2){
        average = letterTofourPointZero(average);
        document.getElementById(`Average${id}`).innerHTML = average+"";
    }
    if(parseInt(students[id-1].average)<60){
        document.getElementById(`Average${id}`).style.backgroundColor = "red";
        document.getElementById(`Average${id}`).style.color = "white";
    }
    else{
        document.getElementById(`Average${id}`).style.backgroundColor = "inherit";
        document.getElementById(`Average${id}`).style.color = "black";
    }
    document.getElementById(`Average${id}`).style.textAlign = "right";
}

function percentToLetter(percent){100
    percent = parseInt(percent);
    switch(true){
        case percent>=93:return "A";
        case percent>=90:return "A-";
        case percent>=87:return "B+";
        case percent>=83:return "B";
        case percent>=80:return "B-"; 
        case percent>=77:return "C+";
        case percent>=73:return "C";
        case percent>=70:return "C-";
        case percent>=67:return "D+";
        case percent>=63:return "D";
        case percent>=60:return "D-";
        case percent<60:return "F";
        default: return '';
    }
}
function letterTofourPointZero(percent){
    switch(true){
        case percent>=93: return "4.0";
        case percent>=90: return "3.7"; 
        case percent>=87: return "3.3";
        case percent>=83: return "3.0"; 
        case percent>=80: return "2.7"; 
        case percent>=77: return "2.3";
        case percent>=73: return "2.0";
        case percent>=70: return "1.7";
        case percent>=67: return "1.3";
        case percent>=63: return "1.0";
        case percent>=60: return "0.7";
        case percent<60: return "0.0";
        default: return '';
    }
}
//Function to make sure input is right format
function newValue(value){
    const regex = /^(0|[1-9][0-9]?|100)$/;
    if(regex.test(value)){
        return value;
    }
    else{
        return "-";
    }
}
//function to update particular student grade from input tag
function updateStudentGrade(cell,value,rowIndex){
    let colIndex = cell.cellIndex;
    let headings = table.rows[0].cells;
    let student = students[rowIndex-1];
    Object.entries(student).forEach(([key, val]) => {
            if(key == headings[colIndex].id){
                student[key] = value;
            }
    });
}
//Updates the count of unsubmitted assignments
function updateSubmissionCount(){
    var assignmentNumber = getAssingmentNumber();
    let count = assignmentNumber * students.length;
    for(let i = 0; i<students.length;i++){
        let currentStudent = students[i];
        Object.entries(currentStudent).forEach(([key, val]) => {
            const regexGrade = /^(0|[1-9][0-9]?|100)$/;
            const regexAssignment = /^assignment.+$/;
            if(regexAssignment.test(key)){
                if(regexGrade.test(val)){
                    count--;
                }
            }
        });
    }

    submissionCount.innerHTML = count;
}
function getAssingmentNumber(){
    var assignmentNum = 0;
    const regexAssignment = /^assignment.+$/;
    Object.entries(students[0]).forEach(([key, val]) => {
        if(regexAssignment.test(key)){
            assignmentNum++;
        }
    });
    return assignmentNum;
}