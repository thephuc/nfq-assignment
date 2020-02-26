import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Item from './Item';
import EditItem from './EditItem';
import '../styles/common.scss';
import '../styles/itemList.scss';

const PersonalCollection = () => {
  const { personalCollectionMap } = useSelector(state => state.itemStore);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filterTerm, setFilterTerm] = useState(null);
  const [personalCollection, setPersonalCollection] = useState(personalCollectionMap);

  const filterData = () => {
    //  if no media are found from redux store, do nothing
    if (!personalCollectionMap || Object.keys(personalCollectionMap).length === 0) { 
      return; 
    }

    //  if filter term is empty, return the full list found from redux store
    if (!filterTerm) { 
      setPersonalCollection(personalCollectionMap); 
      return;
    }

    //  else, convert the titles and filterTerm to lower case and filter
    const data = Object.values(personalCollectionMap).reduce((filteredMedia, media) => {
      const { title } = media;
      if (title && title.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1) {
        filteredMedia[media['nasa_id']] = media;
      }
      return filteredMedia;
    }, {});
    setPersonalCollection(data);
  }

  useEffect(() => {
    filterData();
  }, [personalCollectionMap])

  return (
    <div className='item-list personal-collection'>
      <div className='header'>
        <span> My Collection </span>
        <a className='redirecting-link' href='/search'>Add media to collection</a>
      </div>

      <div className='functions'>
        <label>Filter by title (case-insensitive)</label>
        <input 
          className='filter-list'
          type='text'
          placeholder='Type your filter keyword then hit Enter'
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              filterData();
            }
          }}
          onChange={(e) => setFilterTerm(e.target.value)} 
        />
      </div>

      <div className='body'>
        {Object.keys(personalCollection).length > 0 &&
          <div className='media-list'>
            {Object.keys(personalCollection).map((key) => <Item
              key={key} id={key}
              onOpenEditDialog={() => {
                setIsEditDialogOpen(true);
                setSelectedMedia(personalCollection[key]);
              }}
              isCollectionPage={true} media={personalCollection[key]}></Item>)}
          </div>}
        {Object.keys(personalCollection).length === 0 && 
          <div className='no-result'>No media found</div>}
      </div>

      {isEditDialogOpen && <EditItem
        onCloseDialog={() => {
          setIsEditDialogOpen(false);
          setSelectedMedia(null)
        }}
        selectedMedia={selectedMedia} />}
    </div>
  );
}

export default PersonalCollection;
