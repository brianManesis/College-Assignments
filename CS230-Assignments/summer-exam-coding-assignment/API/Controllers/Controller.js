const Student = require('../Model/studentSchema');
const Tutor = require('../Model/tutorSchema');
const Tutorial = require('../Model/tutorialSchema');

module.exports = {
    insertStudent: (req,res,next)=>{
        let details = req.body;
        var newStudent = new Student(details);
        newStudent.save()
        .then((student)=>{
            res.send(student)
        })
        .catch((err)=>{
            next(err);
        });
    },
    insertTutor: (req, res, next)=>{
        let details = req.body;
        var newTutor = new Tutor(details);
        newTutor.save()
        .then((tutor)=>{
            res.send(tutor);
        })
        .catch((err)=>{
            next(err);
        });
    },
    insertTutorial: (req, res, next)=>{
        let details = req.body;
        var newTutorial = new Tutorial(details);
        newTutorial.save()
        .then((tutorial)=>{
            console.log(tutorial);
            res.send(tutorial);
        })
        .catch((err)=>{
            console.log(err);
            next(err);
        });
    },
    findStudent: (req, res, next)=>{
        let params = req.params;
        if(params._id===undefined){
            Student.find({})
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
        else{
            Student.find(params)
            .then(result=>{
                console.log(result);
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
    },
    findTutor: (req, res, next)=>{
        let params = req.params;
        console.log(params);
        if(params._id ===undefined){
            Tutor.find({})
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
        else{
            Tutor.find(params)
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
    },
    findTutorial: (req, res, next)=>{
        let params = req.params;
        console.log(params);
        if(params._id ===undefined){
            Tutorial.find({})
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
        else{
            TutorialDetails.find(params)
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                next(err);
            });
        }
    },
    updateStudent: async(req, res, next)=>{
        let details = req.body;
        console.log(details);
        let searchBy = req.params;
        let students = null;
        try{
            if(searchBy._id===undefined){
                students = await Student.updateMany({},details);
            }
            else{
            students = await Student.updateMany(searchBy,details);
            }
        }catch(err){
            next(err);
        }
        res.send(students);
    },
    updateTutor: async(req, res, next)=>{
        let details = req.body;
        console.log(details);
        let searchBy = req.params;
        
        let tutors = null;
        try{
            if(searchBy._id===undefined){
                tutors = await Tutor.updateMany({},details);
            }
            else{
                tutors = await Tutor.updateMany(searchBy,details);
            }
        }catch(err){
            next(err)
        }
        res.send(tutors);
    },
    updateTutorial: async(req, res, next)=>{
        let details = req.body;
        console.log(details);
        let searchBy = req.params;
        
        let tutorials = null;
        try{
            if(searchBy._id===undefined){
                tutorials = await Tutorial.updateMany({},details);
            }
            else{
                tutorials = await Tutorial.updateMany(searchBy,details);
            }
        }catch(err){
            next(err)
        }
        res.send(tutorials);
        
    },
    deleteStudent: (req, res, next)=>{
        let query = req.params;
        console.log(query);
        Student.deleteMany(query)
        .then(result=>{
            res.send(result);
        })
        .catch(err=>{
            next(err);
        });
    },
    deleteTutor: (req, res, next)=>{
        let query = req.params;
        console.log(query);
        Tutor.deleteMany(query)
        .then(result=>{
            res.send(result);
        })
        .catch(err=>{
            next(err);
        });
    },
    deleteTutorial: (req, res, next)=>{
        let query = req.params;
        console.log(query);
        Tutorial.deleteMany(query)
        .then(result=>{
            res.send(result);
        })
        .catch(err=>{
            next(err);
        });
    }
}