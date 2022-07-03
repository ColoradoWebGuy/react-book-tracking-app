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
    let bookExists = false

    const updatedLibrary = this.state.library.filter((book) => {
        // filter out the 'none' books
        if (book.id === setBook.id && setBook.shelf === 'none') {
          return false // skip this to have it removed
        } else {
          return true
        }
    }).map((book) => { 
        // update book shelf if it exists
        if (book.id === setBook.id && setBook.shelf !== 'none') {
          bookExists = true
          return {...book, shelf: setBook.shelf}
        } else {
          return book
        }
     })

    if (!bookExists) {
      const newBook = {...setBook.bookObj, shelf: setBook.shelf}
      updatedLibrary.push(newBook)
    }
      
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
