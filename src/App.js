import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookCategory from "./BookCategory";
import Book from "./Book";
import { Route, Link } from "react-router-dom";
class BooksApp extends React.Component {
  state = {
    books: [],
    query: ""
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  updateQuery = query => {
    this.setState(() => ({
      query: query.trim()
    }));
    BooksAPI.search(this.state.query);
  };

  update(array) {
    BooksAPI.update(array[0], array[1]);
    console.log(array);
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  render() {
    const { books, query } = this.state;
    const showingBooks =
      query === ""
        ? books
        : books.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase())
          );
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    value={query}
                    onChange={event => this.updateQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {showingBooks.map(book => (
                    <Book
                      book={book}
                      key={book.id}
                      changeShelf={array => this.update(array)}
                    />
                  ))}
                </ol>
              </div>
            </div>
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookCategory
                    shelf="wantToRead"
                    books={books}
                    changeBookShelf={array => this.update(array)}
                  />
                  <BookCategory
                    shelf="currentlyReading"
                    books={books}
                    changeBookShelf={array => this.update(array)}
                  />
                  <BookCategory
                    shelf="read"
                    books={books}
                    changeBookShelf={array => this.update(array)}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
