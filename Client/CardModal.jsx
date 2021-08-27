import React from 'react';
import axios from "axios";

import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { FaMedal, FaRegEye } from 'react-icons/fa';
import { BsSun } from 'react-icons/bs';


function CardModal(props) {
  if (!props.show) {
    return null;
  }

  const handleAddToUserCards = function () {
    axios.post(`http://localhost:3000/addToUserPlaces/?travelerID=${props.currentTravelerID}&placeID=${props.currentCard.place_id}`)
      .then((results) => {
        props.updateCollectedCardsSlider();
        //console.log(results.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }


  return (
    <div className="modal-image2" onClick={() => { props.handleHideCardModal() }}>
      <div className="modal-content-image2" onClick={(e) => { e.stopPropagation() }}>
        <div className="modal-header-image2">
          <h4 className="modal-title-image2">THIS IS CARD</h4>
        </div>
        <div className="modal-body-image2">
          <div className="popup-image2" style={{ backgroundImage: `url(${props.currentCard.photourl})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}>
            <h2 className="create-card-name2">{props.currentCard.name}</h2>

          </div>
        </div>
        <div className="modal-footer-image2">
          <BsSun className="points-icon" />
          <FaMedal className="medal-icon" onClick={(e) => { handleAddToUserCards(e) }} />
          <FaRegEye className="want-to-go-icon" />
          <IoMdCheckmarkCircle className="been-here-icon" />
        </div>
      </div>
    </div>
  )
};

export default CardModal;