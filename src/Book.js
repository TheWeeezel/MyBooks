import React, { Component } from "react";

class Book extends Component {
  updateBook(book, shelf) {
    let array = [book, shelf];
    this.props.changeShelf(array);
  }
  render() {
    const { book } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={event => this.updateBook(book, event.target.value)}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors + " "} </div>
        </div>
      </li>
    );
  }
}

export default Book;
