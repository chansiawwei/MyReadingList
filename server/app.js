const express = require ('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose=require ('mongoose')
const cors= require('cors');


const app=express();

//cors is used for a server to communicate with another
//allow cross-origin request
app.use(cors());

//connect to mongoDB
const URL_DB = 'mongodb+srv://siawwei:test123@cluster0-zwbjd.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URL_DB , { useNewUrlParser: true });

mongoose.connection.once('open' , () => {
    console.log("connected to Database!")
 
})

//Handle incoming request to graphql server
app.use('/graphql',graphqlHTTP({
//Graphql Schema goes in here
    schema:schema,
    //use the UI query tool
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('Now listening for request on port 4000.');
});