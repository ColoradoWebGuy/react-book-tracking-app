import React, { useState, useEffect } from 'react';
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Route, Routes, useNavigate } from 'react-router-dom'

function BooksApp() {

  const [library, setLibrary] = useState([]);

  useEffect(() => {
    // Runs ONCE after initial rendering
    async function fetchBooks() {
      const booksFromApi = await BooksAPI.getAll();
      setLibrary(booksFromApi);
    }
    fetchBooks();
  }, []);

  let updateBookStatus = (setBook) => {
    let bookExists = false

    const updatedLibrary = library.filter((book) => {
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
      
    setLibrary(updatedLibrary);
    
    BooksAPI.update(setBook.bookObj, setBook.shelf)
  }

  
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={
          <ListBooks 
            library={library}
            onBookUpdate={(setBookShelf) => {
              updateBookStatus(setBookShelf)
            }}
          />
        } exact />
        <Route path='/search-books' element={
          <SearchBooks 
            library={library}
            onBookUpdate={(setBookShelf) => {
              updateBookStatus(setBookShelf)
            }}
          />
        } />
      </Routes>
    </div>
  )
  
}

export default () => {
    let navigate = useNavigate();
    return (
        <BooksApp navigate={navigate} />
    )
}
