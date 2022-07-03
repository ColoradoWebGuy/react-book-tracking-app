import React from 'react'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Route, Routes, useNavigate } from 'react-router-dom'

class BooksApp extends React.Component {

  state = {
    library: []
  }

  componentDidMount() {
      BooksAPI.getAll()
      .then((booksFromApi) => {
          this.setState((prevState) => ({
              library: [...booksFromApi, ...prevState.library]
          }))
      })
  }

  updateBookStatus = (setBook) => {
    console.log('AppJS Update!',setBook);
    let foundBook = false

    const updatedLibrary = this.state.library.map((book) => {
      if (book.id === setBook.id) {
        foundBook = true
        return {...book, shelf: setBook.shelf}
      } else {
        return book
      }
    })

    if (!foundBook)
      updatedLibrary.push(setBook.bookObj)
      
    this.setState(() => ({
      library: updatedLibrary
    }));
    
    BooksAPI.update(setBook.bookObj, setBook.shelf)
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route path='/' element={
            <ListBooks 
              library={this.state.library}
              onBookUpdate={(setBookShelf) => {
                this.updateBookStatus(setBookShelf)
              }}
            />
          } exact />
          <Route path='/search-books' element={
            <SearchBooks 
              library={this.state.library}
              onBookUpdate={(setBookShelf) => {
                this.updateBookStatus(setBookShelf)
              }}
            />
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
