import React from 'react'
import './App.css'
// import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route, Routes, useNavigate } from 'react-router-dom'

class BooksApp extends React.Component {

  state = {
    profile: null,
    myreads: {
      current_reads: [],
      want_to_read: [],
      read: []
    }
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route path='/' element={
            <ListBooks 
              myreads={this.state.myreads}
            />
          } exact />
          <Route path='/search-books' element={
            <SearchBooks />
          } />
        </Routes>
      </div>
    )
  }
}

export default () => {
    let navigate = useNavigate();
    return (
        <BooksApp navigate={navigate} />
    )
}
