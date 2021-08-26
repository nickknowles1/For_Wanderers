import React from 'react';
import axios from "axios";

import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { IoShieldCheckmarkSharp } from 'react-icons/io';
import { FaMedal, FaRegEye } from 'react-icons/fa';
import { BsSun } from 'react-icons/bs';


function CreateCardModal(props) {
  if (!props.show) {
    return null;
  }

  const handleLeftArrowClick = function () {
    let index = props.photoIndex;
    index--;
    if (index < 0) {
      index = props.photoSelection.length - 1;
    }
    let newState = { photo: props.photoSelection[index], photoIndex: index };
    props.handleUpdateMainAppState(newState);
  }

  const handleRightArrowClick = function () {
    let index = props.photoIndex;
    index++;
    if (index >= props.photoSelection.length) {
      index = 0;
    }
    let newState = { photo: props.photoSelection[index], photoIndex: index };
    props.handleUpdateMainAppState(newState);
  }

  const handleCreateCardClick = function () {
    axios.post(`http://localhost:3000/createNew/?name='${props.itemSearch}'&photoURL='${props.photo}'`)
      .then((results) => {
        console.log(results.data);
        props.updateAllCardsSlider();
        if (results.data === 'Item Card already exists') {
          console.log('fix this later')
        }
        document.getElementById('search-field').value = '';
        props.handleHideCreateCardModal();
      })
      .catch((err) => {
        console.error(err);
      })
  }


  return (
    <div className="modal-image" onClick={() => { props.handleHideCreateCardModal() }}>
      <div className="modal-content-image" onClick={(e) => { e.stopPropagation() }}>
        <div className="modal-header-image">
          <h4 className="modal-title-image">THIS CARD DOES NOT YET EXIST. CREATE IT!</h4>
        </div>
        <div className="modal-body-image">
          <BiLeftArrow onClick={() => { handleLeftArrowClick() }} />
          <div className="popup-image" style={{ backgroundImage: `url(${props.photo})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}>
            <h2 className="create-card-name">{props.itemSearch}</h2>

          </div>
          <BiRightArrow onClick={() => { handleRightArrowClick() }} />
        </div>
        <div className="modal-footer-image">
          <button className="create-button" onClick={() => { handleCreateCardClick() }}>CREATE CARD</button>
        </div>
      </div>
    </div>
  )
};

export default CreateCardModal;