import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails';

//this symbol could be found below esc key
//construct graphql query using package called gql



class BookList extends Component {
  
  constructor(props){
    super(props);
    this.state={
      selected:null
    }
  }
  displayBooks(){
     var data=this.props.data;
     if(data.networkStatus===1){
       return (<div>Loading Books...</div>)
     }
      else{
       //map is use to go through an array an access every single item 
      return data.books.map(book=>{
        return (
        <li key={ book.id } onClick={ (e) => this.setState({ selected: book.id }) }>{ book.name }</li>
        )
      })   
    }
  }

  render(){
  
  return (
    <div >
    <ul  id="book-list">
      {this.displayBooks()}
    </ul>
    <BookDetails bookId={this.state.selected}/>
    </div>
  );
  }
}

export default graphql(getBooksQuery)(BookList);
