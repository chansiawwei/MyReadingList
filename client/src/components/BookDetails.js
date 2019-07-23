import {getBookQuery} from '../queries/queries'
import {graphql} from 'react-apollo';
import React,{Component} from 'react';

class BookDetails extends Component {
    displayBookDetails(){
        //also equal to const book =this.props.data.book;
        console.log(this.props);
        const {book} =this.props.data
         if(book){
             return(
                 <div>
                     <h1>Book Details Here:</h1>
                     <h2>{book.name}</h2>
                     <p>Genre: {book.genre}</p>
                     <p>Author: {book.author.name}</p>
                     <p>All books by this Author:</p>
                     <ul className="other-books">
                         {
                             book.author.books.map(item=>{
                                 return (<li key={item.id}>{item.name}</li>)
                             })
                         }
                     </ul>
                 </div>
             )
         }
         else{
             return(<div>No books selected</div>)
         }
        }
        
    render(){
    
    return (
      <div id="book-details" >
        {this.displayBookDetails()}
          </div>
    );
    }
  }
  
  export default graphql(getBookQuery,{
      options:(props)=>{
          return{
              variables:{
                  id:props.bookId
              }
          }
      }
  })(BookDetails);
  