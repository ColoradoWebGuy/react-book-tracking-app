import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
//import serializeForm from 'form-serialize'

class SearchBooks extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
            this.setState(() => ({
            books
            }))
        })
    }

    render() {
        // const { query, books } = this.state
        const { books } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author"/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                        <li key={book.id}>
                            <Book book={book} />
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks