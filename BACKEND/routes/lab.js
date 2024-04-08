const router = require('express').Router();
let Lab = require("../models/lab_book");

router.route("/add").post((req, res) => {
        const name = req.body.name;
        const index_number = req.body.index_number;

        const newLab = new Lab({
                name,
                index_number
        })

        newLab.save().then(() => {
                res.json ("Lab added successfull")
        }).catch((err) => {
                console.log(err); 
        })
})      
router.route("/").get((req, res) => {
    Lab.find().then((labs) => {
        res.json(labs)
    }).catch((err) => {
        console.log(err);
    })
})


router.route("/update/:id").put(async(req, res) => {
        let labId = req.params.id;
        const {name, index_number} = req.body;
        const updatedLab = {name, index_number};
        const update = await Lab.findByIdAndUpdate(labId, updatedLab).then(() => {
                res.status(200).send({status: "Lab Updated"});
        }).catch((err) => {
                console.log(err);
                res.status(500).send({status: "Error with updating Lab", error: err});
        })
        
})

router.route("/delete/:id").delete(async(req, res) => {
        let labId = req.params.id;
        await Lab.findByIdAndDelete(labId).then(() => {
        res.status(200).send({status: "Lab Deleted"});}).catch((err) =>{
                console.log(err);
        res.status(500).send({status: "Error with deleting Lab", error: err})})
        
})


router.route("/get/:id").get(async(req, res) => {
        let labId = req.params.id;
        const lab = await Lab.findById(labId).then((lab) => {
                res.status(200).send({status: "Lab fetched", lab: lab});
        }).catch((err) => {
                console.log(err);
                res.status(500).send({status: "Error with fetching Lab", error: err})
        })
})

module.exports = router;        