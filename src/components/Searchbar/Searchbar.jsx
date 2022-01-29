import { useState } from 'react';
import './Searchbar.css';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


function Searchbar({ onSubmit }) {
const [search, setSearch] = useState('')

  const handleChangeInput = e => {
    setSearch(e.target.value.toLowerCase())
  };

 const handleFormSubmit = e => {
    e.preventDefault();
    if (search.trim() === "") {
      toast.warning(' Search image');
      return
    }
    onSubmit(search );
    setSearch('');
  };

  
    return (
      
        <header className="Searchbar ">
          <form className="SearchForm" onSubmit={handleFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch height={100} width={100}/>
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              value={search}
              onChange={handleChangeInput}
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header> 
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}

export default Searchbar;