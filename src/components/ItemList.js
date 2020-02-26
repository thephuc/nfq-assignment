import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchNasaMedia } from '../sagas/actions';
import Item from './Item';
import '../styles/common.scss';
import '../styles/itemList.scss';

const ItemList = () => {
  const dispatch = useDispatch();
  const searchResultMap = useSelector(state => state.itemStore && state.itemStore.searchResultMap);
  const isSearchLoading = useSelector(state => state.itemStore && state.itemStore.loading && state.itemStore.loading.searchNasaMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  return (
    <div className='item-list'>
      <div className='header'>
        <span>Search NASA Media</span>
        <a className='redirecting-link' href='/collection'>Back to collection</a>
      </div>
      <div className='body'>
        <input 
          className='search-input'
          type='text'
          placeholder='Type your search keyword then hit Enter'
          onKeyPress={(e) => {
            if (e.key === 'Enter' && searchTerm) {
              setIsSearched(true);
              dispatch(searchNasaMedia(searchTerm));
            }
          }}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />

        {Object.keys(searchResultMap).length > 0 &&
          <div className='media-list'>
            {Object.keys(searchResultMap).map((key) => <Item 
            key={key} id={key} 
            media={searchResultMap[key]}></Item>)}
          </div>}
        { isSearchLoading && <div className='loading'>Loading results...</div> }
        {Object.keys(searchResultMap).length === 0 && isSearched && !isSearchLoading &&
          <div className='no-result'>No results found</div>}
      </div>

    </div>
  );
}

export default ItemList;
