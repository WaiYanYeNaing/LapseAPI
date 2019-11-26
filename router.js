const express = require('express');
const router = express.Router();
const CardModel = require('./model/Card');
const StatusModel = require('./model/Status');

router.get('/cards/', async (req, res) => {
    try {
        const cards = await CardModel.find()
        res.json(cards)
    } catch (err) {
        res.json({message: err})
    }
})
router.post('/cards/', async (req, res) => {
    const {card_description} = req.body
    try {
        const card = new CardModel({
            card_description
        })
        const new_card = await card.save()
        res.json(new_card)
    } catch (err) {
        res.json({message: err})
    }
}) 

router.get('/status/', async (req, res) => {
    try {
        const status = await StatusModel.find()
        res.json(status)
    } catch (err) {
        res.json({message: err})
    }
})
router.post('/status/', async (req, res) => {
    const {status1, status2, status3, status4, status5} = req.body
    try {
        const status = new StatusModel({
            status1,
            status2,
            status3,
            status4,
            status5
        })
        const new_status = await status.save()
        res.json(new_status)
    } catch (err) {
        res.json({message: err})
    }
}) 
// router.put('/status/5ddcb7bbe22f5215e04a250d', async (req, res) => {
//     const {status1, status2, status3, status4, status5} = req.body
//     const updateStatus = await StatusModel.updateOne({_id: "5ddcb7bbe22f5215e04a250d"})
// })

module.exports = router