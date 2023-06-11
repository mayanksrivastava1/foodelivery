const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Mayank:12345@foodapp.tcwttru.mongodb.net/Foodapp?retryWrites=true&w=majority"
const mongoDB = async ()=>{
    
        await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err)
            console.log("...", err);

        else {
            console.log("Connected Successfully");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (error, data) {
                const FoodCategory = await mongoose.connection.db.collection("FoodCategory");
                FoodCategory.find({}).toArray(function(err,catData){
                    if (err){
                    console.log(err);
                    }
                else{
                    global.food_items = data;
                    global.FoodCategory = catData;
                }
                })
                
            });
        }
    });
    } 
    
module.exports = mongoDB();



