const express = require('express')
const router = express.Router()


router.post('/foodData',(req,res)=>{
    try {
        console.log(global.food_items)
        res.send([global.food_items,global.FoodCateory])
    } catch (error) {
        console.log(error)
        res.send("server Error")
    }
})

module.exports = router;