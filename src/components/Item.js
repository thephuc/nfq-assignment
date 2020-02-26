import React from 'react';
import { useDispatch } from 'react-redux';
import '../styles/common.scss';
import '../styles/item.scss';
import { addMediaToCollection, toggleLikeMedia, removeMediaFromCollection } from '../sagas/actions';
const Item = (props) => {
  const dispatch = useDispatch();
  const { media, isCollectionPage, onOpenEditDialog } = props;
  const previewImage = media && media.links && media.links.length > 0 ? media.links.find((link) => link.rel && link.rel === 'preview') : null;
  const previewImageUrl = previewImage && previewImage.href ? encodeURI(previewImage.href) : null;
  const createdTime = media['date_created'] ? new Date(media['date_created']) : null;

  return (
    media &&
    <div className='media-item'>
      <div className='preview-image' style={{backgroundImage: `url(${previewImageUrl})`}}></div>
      <div className='buttons'>
        { !isCollectionPage && <button 
        className={media.isInCollection ? 'added' : 'add'}
        disabled={media.isInCollection}
        onClick={() => dispatch(addMediaToCollection(media))}>{ media.isInCollection ? 'Already in collection' : 'Add to collection' }</button> }

        { isCollectionPage && <div className='personal-collection-buttons'>
            <button className='remove' onClick={() => dispatch(removeMediaFromCollection(media['nasa_id']))}>Remove</button>
            <button className={media.liked ? 'liked' : 'like'}
            onClick={() => dispatch(toggleLikeMedia(media['nasa_id']))} >
              {media.liked ? 'Liked' : 'Like'}
            </button>
            <button 
            onClick={onOpenEditDialog}
            className='edit'>Edit</button>
          </div>}
      </div>
      <div className='title'>{media.title || null}</div>
      <div className='timestamp'>{createdTime && createdTime.toString()}</div>
      <div className='description'>{media.description || null}</div>
    </div>
  );
}

export default Item;
