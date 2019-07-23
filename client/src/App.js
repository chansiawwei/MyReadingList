import React,{Component} from 'react';
import BookList from  './components/BookList';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import AddBooks from './components/AddBooks';

//apollo client setup
const client=new ApolloClient({
  uri:"http://localhost:4000/graphql"
})

class App extends Component {
  render(){
  return (
    <ApolloProvider client={client}>
    <div id="main">
   <h1>Siaw Wei's Reading List</h1>
   <BookList/>
   <AddBooks/>
    </div>
    </ApolloProvider>
  );
  }
}

export default App;
