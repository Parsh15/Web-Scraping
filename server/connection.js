const mongoose=require("mongoose")

async function connect(url){
    mongoose.connect(url)
}

module.exports={
    connect
}