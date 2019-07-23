const mongoose=require ('mongoose')
const Schema=mongoose.Schema;

const bookSchema= new Schema({
    name:String,
    genre:String,
    authorId:String
});

//Making a collecion of Book using bookSchema
module.exports=mongoose.model("Book",bookSchema)