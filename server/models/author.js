const mongoose=require ('mongoose')
const Schema=mongoose.Schema;

const authorSchema= new Schema({
    name:String,
    age:Number,
});

//Making a collecion of Book using bookSchema
module.exports=mongoose.model("Author",authorSchema);