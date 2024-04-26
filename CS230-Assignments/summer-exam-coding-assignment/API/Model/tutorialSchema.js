const mongoose = require('mongoose');
const Student = require('./studentSchema');

const tutorialSchema = new mongoose.Schema({
    Date: {
        type:Date,
        required:true,
        min: '2022-01-01',
        max: '2024-01-01'
    },
    Time:{
        type:String,
        required:true,
        validate: {
            validator: function (time) {
                let timeRegEx = new RegExp("^([01][0-9]|2[0-3]):([0-5][0-9])$");
                if(!timeRegEx.test(time)){return false;}
                return true;
            }
        }
    },
    Students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        validate: {
            validator: function (students) {
                if(students.length < 1 || students.length>5){return false}
                return true;
            }
        }
    }],
    Tutor:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Tutor',
        required:true
    },
    Fee:{
        type:String,
        required: true,
        validator: function (Fee) {
            let feeRegEx = new RegExp("^[0-9]+\\.[0-9][0-9]$");
            if(!feeRegEx.test(Fee)){return false;}
            return true;
        }
    },
    TutorialAttendence:{
        type: String,
        enum: ["Attended", "Cancelled", "No Show"],
        required:true
    },
    TutorialSubject:{
        type:String,
        enum: ["English", "Irish", "Maths", "Biology", "Chemistry","Physics", "Computer Science"]
    },
    TutorialNotes:{
        type:String,
        required:true
    }
});

const Tutorial = mongoose.model('Tutorial',tutorialSchema,'Tutorial');
module.exports = Tutorial;