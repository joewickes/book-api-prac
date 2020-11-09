import React from 'react';
import './App.css';
import Form from './components/Form';
import Book from './components/Book';
import apiKey from './components/apiKey';

class App extends React.Component {

  state = {
    loading: false,
    books: [],
    filteredBooks: [],
    baseUrl: 'https://www.googleapis.com/books/v1/volumes?q=',
    endUrl: '&key=',
    apiKey: apiKey,
  }

  getResults = (e, value) => {
    e.preventDefault();
    let url = null;

    this.setState({
      loading: true,
    });

    const printType = e.target.printType.value;
    const bookType = e.target.bookType.value;

    if (printType === 'ebook' && bookType === 'all') {
      url = this.state.baseUrl + value + '&filter=ebooks' + this.state.endUrl + this.state.apiKey;
    } else if (printType === 'ebook' && bookType === 'free') {
      url = this.state.baseUrl + value + '&filter=free-ebooks' + this.state.endUrl + this.state.apiKey;
    } else if (printType === 'all' && bookType === 'paid') {
      url = this.state.baseUrl + value + '&filter=paid-ebooks' + this.state.endUrl + this.state.apiKey;
    } else {
      url = this.state.baseUrl + value + this.state.endUrl + this.state.apiKey;
    }
    
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(parsed => 
        this.setState({
          loading: false,
          books: parsed.items,
          filteredBooks: parsed.items,
          baseUrl: this.state.baseUrl,
          endUrl: this.state.endUrl,
          apiKey: this.state.apiKey,
        }))
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    return (
      <div className="App">
        <h1>Google Book Search</h1>
        <Form getResults={this.getResults} filterPrint={this.filterPrint} filterCost={this.filterCost} />
        {this.state.loading && <div>Loading...</div>}
        <ul className= "book-list">
          {this.state.filteredBooks.map(book => {
            console.log(book);

            let image = null ; // book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : '';
            let price = null;
            let desc = null;

            if (book.volumeInfo.imageLinks !== undefined) {
              image = book.volumeInfo.imageLinks.thumbnail;
            } else image = '';

            if (book.saleInfo.listPrice !== undefined && book.saleInfo.listPrice.amount !== undefined) {
              price = `$${book.saleInfo.listPrice.amount}`;
            } else if (book.saleInfo.saleability === 'FREE') {
              price = 'Free';
            } else price = 'Not for sale';

            if (book.volumeInfo.description !== undefined) {
              desc = book.volumeInfo.description;
            } else desc = 'Not available';

            return <Book key={book.id} img={image} title={book.volumeInfo.title} author={book.volumeInfo.authors} price={price} desc={desc} />;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
