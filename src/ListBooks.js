import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
class ListBooks extends Component {

    getBooks = (book_ids) => {
      let books = []
      book_ids.forEach(book_id => {
        const book = this.props.library.filter(obj => {
          return obj.id === book_id
        })
        if (book.length > 0) {
          books.push(book)
        }
      });
      return books
    }

    handleBookUpdate = (setBookShelf) => {
      if (this.props.onBookUpdate) {
        this.props.onBookUpdate(setBookShelf)
      }
    }

    render() {

        const { myreads } = this.props
        const currentlyReading = this.getBooks(myreads.currentlyReading);
        const wantToRead = this.getBooks(myreads.wantToRead);
        const read = this.getBooks(myreads.read);

        return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                      {currentlyReading.map((book) => (
                          <li key={book[0].id}>
                            <Book 
                              book={book[0]} 
                              status={`currentlyReading`} 
                              onChange={(setBookShelf) => this.handleBookUpdate(setBookShelf)} />
                          </li>
                      ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wantToRead.map((book) => (
                        <li key={book[0].id}>
                          <Book 
                              book={book[0]} 
                              status={`wantToRead`} 
                              onChange={(setBookShelf) => this.handleBookUpdate(setBookShelf)} />
                        </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {read.map((book) => (
                        <li key={book[0].id}>
                          <Book 
                              book={book[0]} 
                              status={`read`} 
                              onChange={(setBookShelf) => this.handleBookUpdate(setBookShelf)} />
                        </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link
              to='/search-books'
              className='add-contact'>Add a book</Link>
          </div>
        </div>
        )
    }
}

export default ListBooks