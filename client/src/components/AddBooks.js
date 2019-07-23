import React,{Component} from 'react';
//compose function is used to bind to queries function, used when to export this class
import {graphql,compose} from 'react-apollo';
import {getAuthorQuery,addBookMutation, getBooksQuery} from '../queries/queries'

//this symbol could be found below esc key
//construct graphql query using package called gql

class AddBooks extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            age:"",
            authorId: ""
        };
    }
   displayAuthors(){
       var data=this.props.getAuthorQuery;
        if(data.networkStatus===1){
            return(<option disabled>Loading Authors..</option>)
        }
        else{
            return data.authors.map(author=>{
                return(<option key={author.id} value={author.id} > {author.name}</option>)
            })
        }
   }
   submitForm(e){
    if(this.state.name!=="" && this.state.genre!==""){
    this.props.addBookMutation({
        variables:{
            name:this.state.name,
            genre:this.state.genre,
            authorId:this.state.authorId
        },
        refetchQueries:[{query:getBooksQuery}]
    })
    this.setState({
            name:"",
            age:"",
            authorId: ""
    })
    }
   else{
       alert("Input Field cannot be empty, Please check.")
       e.preventDefault();
   }
   }
    render(){

    return (
        <form  id="add-books" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
        <label >Book name:</label>
        <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
        </div>

        <div className="field">
        <label >Genre:</label>
        <input type="text" onChange={(e)=>this.setState({genre:e.target.value}) }/>
        </div>

        <div className="field">
        <label >Select Author:</label>
        <select onChange={(e)=>this.setState({authorId:e.target.value}) } >
            {this.displayAuthors()}
        </select>
        </div>
        <button>+</button>
        </form>
    );
    }
  }
  
  export default compose (
      //the name properties is used to name the field in props
      //"what we see when console.log(this.props)"
      graphql(getAuthorQuery,{name:"getAuthorQuery"}),
      graphql(addBookMutation,{name:"addBookMutation"})
      )(AddBooks);
