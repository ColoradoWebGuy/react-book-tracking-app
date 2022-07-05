import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

function SearchBooks({ onBookUpdate, library }) {
    
    const [query, setQuery] = useState('');
    const [queryResults, setQueryResults] = useState([]);

    const clearResults = () => {
        setQueryResults([])
    }

    const searchQuery = (inputQuery) => {
        setQuery(inputQuery)
        if (inputQuery === '') {
           clearResults()
        } else {
            BooksAPI.search(inputQuery).then((bookSearchResults) => {
                if (bookSearchResults !== undefined && bookSearchResults.length > 0) {       
                    setQueryResults([...bookSearchResults])
                } else {
                    clearResults()
                }
            })
        }
    }

    const handleBookUpdate = (setBook) => {
      if (onBookUpdate) {
        onBookUpdate(setBook)
      }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    to='/'
                    className='close-search'>Close</Link>
                <div className="search-books-input-wrapper">
                <input 
                    type='text'
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => searchQuery(event.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                {queryResults.length > 0 && (
                <div className='showing-shelf-books'>
                    <ol className="books-grid">
                        {queryResults.map((book) => (
                            ( book !== undefined &&
                            <li key={book.id}>
                                <Book 
                                    book={book} 
                                    myReads={library}
                                    onChange={(setBook) => handleBookUpdate(setBook)} />
                            </li>
                            )
                        ))}
                    </ol>
                </div>
                )}
            </div>
        </div>
    )
    
}

SearchBooks.propTypes = {
  library: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired
}


export default SearchBooks