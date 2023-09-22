const express = require('express');

// Scheme Import
const Details = require('../models/Details')

//  Router Initilization
const router = express.Router();

// Route 1 : to Say Hello on localhost:5000/api/details/ 
router.get('/', (req, res) => {
    res.send('Welcome to VPatrol Bank Details Assestment')
})

// Route 2 : Add Bank Details Using POST Requset if user_id is present add details to same user else add new user
router.post('/adddetails', async (req, res) => {
    try {
        // Getting data from Request body
        const data = await req.body
        // Checking if the data for user_id exists
        let id = await Details.findOne({ user_id: data.user_id },)
        // if data for user_id exists adding data to same 
        if (id) {
            // Updating datat to existing data
            const updatedDetails = new Details({
                user_id: id.user_id,
                user_name: id.user_name,
                back_accounts: id.back_accounts.concat(data.back_accounts),
                id: id.id,
                name: id.name,
                accounts: id.accounts.concat(data.accounts)
            })
            // Removing Previous Data
            id = await Details.findByIdAndDelete(id._id.toString())
            // Adding New Data
            id = await Details(updatedDetails)
            id.save()

            // Sharing the added Details 
            res.send(updatedDetails)
            // if data for user_id does not exists adding new user
        } else {
            // Setting new details from request body
            const details = new Details(req.body)
            // Saving  on Database
            details.save()
            // Sharing details
            res.send(req.body)
        }

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

// Route 3 : Getting all the Details from all user from DB
router.get('/fetchalldetails', async (req, res) => {
    try {
        // finding every document stored in collection in DB
        const details = await Details.find({})
        res.json(details)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router