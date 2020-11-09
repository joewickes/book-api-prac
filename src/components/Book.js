import React from 'react';
import './Book.css';

class Book extends React.Component {
  static defaultProps = {
    img: '#',
    title: '',
    author: '',
    price: '',
    desc: '',
  }
  
  render() {

    const {img, title, author, price, desc} = this.props;

    return (
      <li>
        <div className="book-top">
          <div className="book-left">
            <img src={img} alt={`${title}`} />
          </div>
          <div className="book-right">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="book-bottom">
          <p>Author: {author}</p>
          <p>Price: {price}</p>
          <p>Description: {desc}</p>
        </div>
      </li>
    );
  }
}

export default Book;