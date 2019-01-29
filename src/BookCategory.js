import React, { Component } from "react";
import Book from "./Book";

class BookCategory extends Component {
  updateBook(array) {
    this.props.changeBookShelf(array);
  }

  render() {
    const { shelf, books } = this.props;
    const relevantBooks = books.filter(book => {
      return book.shelf === shelf;
    });
    const shelfName = shelf === 'read' ? 'Already Read' : shelf === 'wantToRead' ? 'Want to Read' : 'Currently Reading';
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {relevantBooks.map(book => (
              <Book book={book} key={book.id} changeShelf={(array) => this.updateBook(array)} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookCategory;
