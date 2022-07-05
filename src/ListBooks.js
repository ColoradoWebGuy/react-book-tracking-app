import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

function ListBooks({library, onBookUpdate}) {

    const handleBookUpdate = (setBook) => {
      if (onBookUpdate) {
        onBookUpdate(setBook)
      }
    }

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
                      {library.map((book) => {
                          if (book.shelf === 'currentlyReading') {
                            return (<li key={book.id}>
                              <Book 
                                book={book} 
                                onChange={(setBook) => handleBookUpdate(setBook)} />
                            </li>)
                          } else {
                            return ''
                          }
                        }
                     )}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {library.map((book) => {
                          if (book.shelf === 'wantToRead') {
                            return (<li key={book.id}>
                              <Book 
                                book={book} 
                                onChange={(setBook) => handleBookUpdate(setBook)} />
                            </li>)
                          } else {
                            return ''
                          }
                        }
                     )}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {library.map(
                        (book) => {
                          if (book.shelf === 'read') {
                            return (<li key={book.id}>
                              <Book 
                                book={book} 
                                onChange={(setBook) => handleBookUpdate(setBook)} />
                            </li>)
                          } else {
                            return ''
                          }
                        }
                     )}
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

ListBooks.propTypes = {
  library: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired
}

export default ListBooks