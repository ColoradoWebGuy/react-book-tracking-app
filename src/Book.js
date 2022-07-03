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
        const { book, myReads = false } = this.props
        let shelfStatus = 'none'
        if (myReads !== false) {
            myReads.forEach((b) => {
                if (b.id === book.id) {
                    shelfStatus = b.shelf
                }
            })
        } else {
            shelfStatus = book.shelf
        }
        return (
            <div className="book" key={book.id}>
                <div className="book-top">
                    {book.imageLinks !== undefined && book.imageLinks.thumbnail !== undefined && book.imageLinks.length !== 0 &&
                    <div className="book-cover" 
                        style={{ width: 128, height: 193, backgroundcolor: '#1c1c1c', backgroundImage:'url("'+ book.imageLinks.thumbnail +'")' }}>
                    </div>
                    }
                    <div className="book-shelf-changer">
                        <select value={(shelfStatus !== undefined ? shelfStatus : 'none')} onChange={this.handleChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                {book.title !== undefined &&
                <div className="book-title">{`${book.title}`}</div>
                }
                {book.authors !== undefined &&
                <div className="book-authors">{`${ book.authors.join(', ') }`}</div>
                }
                {/* <div className="book-authors">{`${shelfStatus}`}</div> */}
            </div>
        )
    }
}

export default Book;