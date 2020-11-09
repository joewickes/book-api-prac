import React from 'react';
import './Form.css';

class Form extends React.Component {
  
  render() {
    const {getResults} = this.props;

    return (
      <>
        <div className="search-bar">
          <form className="search-form" onSubmit={(e) => getResults(e, e.target.search.value)}>
            <label htmlFor="search">Search</label>
            <input type="search" name="search" id="search" />
            <button type="submit">Search</button>

            <div className="filter-bar">
              <label htmlFor="printType">Print Type</label>
              <select name="printType" id="printType">
                <option value="all">All</option>
                <option value="book">Book</option>
                <option value="ebook">eBook</option>
              </select>
              <label htmlFor="bookType">Book Type</label>
              <select name="bookType" id="bookType">
                <option value="all">All</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Form;