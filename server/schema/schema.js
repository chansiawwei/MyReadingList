const graphql=require('graphql');
const _=require ('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

//A graphql schema has 3 responbilities
//1)Define Type
//2)Define relationships between Type
//3)Defining Roots Query (how to initially get into the graph to get data)
// 4 kind of roots query in this example, get a books,get an author, get all books and get all author

//This uses ES6 features
//grab the properties from graphql packages
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt, 
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList } = graphql;



//Define Object Type Here
//GraphQLObjectType is a functon which takes in an object
const BookType=new GraphQLObjectType({
    name:'Book',
    //fields has to be wrapped in a function thats return an object 
    fields: () =>({
        //Cant use normal String, have to use GraphQLString
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            //resolve function is used for " go out and grab data"
            resolve(parent,args){
                // console.log(parent)
                // return _.find(authors,{id:parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })

});

const AuthorType=new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                /*
                looks into books array, for any book that has the authorID of the 
                particular authorID, return its
                */
                // return _.filter(books,{authorId:parent.id});  
                return Book.find({authorId:parent.id});
            }   
        }   
    })
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        //the name of the query
        book:{
            type:BookType,
            //expect a id to pass along with the query "book(id:'123')"
            args:{id: {type:GraphQLID} },
            resolve(parent,args){
                //code to get data from db/other sources 
                //Use 'lodash' to look through books array, 
                //find any books that has the id of the the id argument passed along 
                // return _.find(books, { id: args.id });
                return Book.findById(args.id)
            }

        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id});
                return Author.findById(args.id)

            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return books;
                return Book.find({});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors;
                return Author.find({});

            }
        },

    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },

            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId:args.authorId
                });
                return book.save();
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation   

});