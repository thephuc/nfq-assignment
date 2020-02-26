import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMedia } from '../sagas/actions';
import '../styles/common.scss';
import '../styles/editItem.scss';

const EditItem = (props) => {
  const dispatch = useDispatch();
  const { selectedMedia, onCloseDialog } = props;
  const [title, setTitle] = useState(selectedMedia.title);
  const [description, setDescription] = useState(selectedMedia.description);
  const [previewImageData, setPreviewImageData] = useState(selectedMedia.links.find((link) => link.rel && link.rel === 'preview'));
  const [captionData, setCaptionData] = useState(selectedMedia.links.find((link) => link.rel && link.rel === 'captions'));

  const saveChanges = () => {
    dispatch(updateMedia(getUpdatedMediaData()))
    onCloseDialog();
  }

  //  helper function to construct updated media object before
  //  dispatching action to update redux store
  const getUpdatedMediaData = () => {
    return {
      ...selectedMedia,
      title,
      description,
      links: [...selectedMedia.links, previewImageData, captionData]
    }
  }

  return (
    <div className='overlay'>
      <div className='edit-item'>
        <div className='header'>
          <span className='title'>Edit Media</span>
        </div>
        <div className='body'>
          <div className='edit-field'>
            <label>Title</label>
            <input
              value={title}
              type='text' onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className='edit-field'>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className='edit-field'>
            <label>Preview Image URL</label>
            <input
              value={previewImageData && previewImageData.href}
              type='text' onChange={(e) => setPreviewImageData(e.target.value)} />
          </div>

          <div className='edit-field'>
            <label>Caption URL</label>
            <input
              value={captionData && captionData.href}
              type='text' onChange={(e) => setCaptionData(e.target.value)} />
          </div>
        </div>

        <div className='buttons'>
          <button onClick={onCloseDialog} className='cancel'>Cancel</button>
          <button onClick={saveChanges} className='save'>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditItem;
