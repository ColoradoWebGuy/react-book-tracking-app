import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
class SearchBooks extends Component {
    
    state = {
        query: '',
        queryResults: []
    }

    searchQuery = (query) => {
        console.log(JSON.stringify({ query }))
        this.setState(()=>({
            query: query
        }))
        BooksAPI.search(query)
        .then((bookSearchResults) => {
            if (bookSearchResults !== undefined && bookSearchResults.length > 0) {        
                this.setState(() => ({
                    queryResults: [...bookSearchResults]
                }))
            } else {
                this.setState(() => ({
                    queryResults: []
                }))
            }
        })
    }

    clearQuery = (e) => {
        e.preventDefault()
        this.searchQuery('')
    }

    handleBookUpdate = (setBook) => {
      if (this.props.onBookUpdate) {
        this.props.onBookUpdate(setBook)
      }
    }

    render() {
        const existingBooks = this.props.library
        const { query, queryResults } = this.state

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
                        onChange={(event) => this.searchQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {queryResults.length === 0 && existingBooks.length > 0 && (
                    <div className='showing-shelf-books'>
                        <p style={{ textAlign:'center', margin:'0', color:'#c2c2c2' }}>
                            Showing {existingBooks.length} books in 'MyReads'
                        </p>
                        <ol className="books-grid">
                            {existingBooks.map((book) => (
                                ( book !== undefined && book.shelf != 'none' &&
                                <li key={book.id}>
                                    <Book 
                                        book={book} 
                                        myReads={existingBooks}
                                        onChange={(setBook) => this.handleBookUpdate(setBook)} />
                                </li>
                                )
                            ))}
                        </ol>
                    </div>
                    )}
                    {queryResults.length > 0 && (
                    <div className='showing-shelf-books'>
                        <p style={{ textAlign:'center', margin:'0', color:'#1c1c1c' }}>
                            Search Results: {queryResults.length} Books - <button onClick={this.clearQuery}>Clear Search</button>
                        </p>
                        <ol className="books-grid">
                            {queryResults.map((book) => (
                                ( book !== undefined &&
                                <li key={book.id}>
                                    <Book 
                                        book={book} 
                                        myReads={existingBooks}
                                        onChange={(setBook) => this.handleBookUpdate(setBook)} />
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
}

export default SearchBooks