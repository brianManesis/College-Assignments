Usage:
from summer-exam-coding-assignment directory run following commands
cd API
node app.js
then once API is running, open the index.html file in the UI directory
All create and update endpoints use JSON as body
Create:
Tutor example- http://localhost:5000/tutor
 {
        "HomeAddress": {
            "AddressLine1": "12 corbally avenue",
            "AddressLine2": "",
            "Town": "Dublin",
            "County_City": "Dublin",
            "Eircode": "D45 833F"
        },
        "Title": "Miss",
        "FirstName": "Debra",
        "Surname": "Brady",
        "Phone": "0938429129",
        "EmailAddress": "brady@mu.ie",
}
Student example- http://localhost:5000/student
{
        "HomeAddress": {
            "AddressLine1": "10 old road",
            "AddressLine2": "Trafford",
            "Town": "Manchester",
            "County_City": "Manchester",
            "Eircode": "M45 KSJS"
        },
        "Title": "Miss",
        "FirstName": "Rosy",
        "Surname": "Beckham",
        "Phone": "0445676564",
        "EmailAddress": "becks@gmail.com",
        "DateOfBirth": "2009-10-28T00:00:00.000Z",
        "Parent_Guardian": "David",
        "VirtualPermission": false,
        "Gender": "Female",
        "Subject": "Art",
}
tutorial example- http://localhost:5000/tutorial
{
        "Date": "2023-05-04T00:00:00.000Z",
        "Time": "16:00",
        "Students": [
            "646e7f220846100045dcff55",
            "646e8eb5ffb91dac0af5fda2"
        ],
        "Tutor": "646e37683db00d18463c9042",
        "Fee": "50.00",
        "TutorialAttendence": "Cancelled",
        "TutorialSubject": "English",
}

Retrieve- retrieve all or specify _id (see Router.js)

Update- same body as create put add changes and specify by _id

Delete- deletes all from collection if _id not specified