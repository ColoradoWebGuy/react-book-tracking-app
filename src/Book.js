import React, { Component } from 'react';

class Book extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
   }

    handleChange(event) {
        let setBookShelf = {
            id: this.props.book.id,
            shelf: event.target.value,
            bookObj: this.props.book
        }
        if (this.props.book.shelf !== event.target.value) {
            this.props.onChange(setBookShelf)
        }
    }

    render() {
        const { book } = this.props

        return (
            <div className="book" key={book.id} >
                <div className="book-top">
                    <div className="book-cover" 
                        style={{ width: 128, height: 193, backgroundImage:'url("'+ book.imageLinks.thumbnail +'")' }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={this.handleChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{`${book.title}`}</div>
                <div className="book-authors">{`${ book.authors.join(', ') }`}</div>
            </div>
        )
    }
}

export default Book;