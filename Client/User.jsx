import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";

class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchedItem: ''
    }

    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleGetDescriptions = this.handleGetDescriptions.bind(this);
  }

  handleSearchButtonClick() {
    this.handleGetDescriptions();
    for (let i = 0; i < this.props.allCardsRolodex.length; i++) {
      if (this.props.allCardsRolodex[i].name === this.state.searchedItem) {
        document.getElementById('search-field').value = '';
        this.props.handleUpdateMainAppState({ showCardModal: true, currentCard: this.props.allCardsRolodex[i] })
        return;
      }
    }
    axios.get(`http://localhost:3000/search/?query=${this.state.searchedItem} wikipedia`)
      .then((results) => {
        let newPhotos = [];
        for (let i = 0; i < results.data.length; i++) {
          if (results.data[i].link === undefined) {
            continue;
          }
          console.log(results.data[i].link);
          newPhotos.push(results.data[i].link)
        }
        this.props.handleUpdateMainAppState({
          photoSelection: newPhotos,
          photo: newPhotos[0],
          itemSearch: this.state.searchedItem
        })
      })
      .then(() => {
        console.log('I am here')
        this.props.handleShowCreateCardModal();
      })
      .catch((err) => {
        console.error(err);
      })
  }

  handleGetDescriptions() {
    axios.get(`http://localhost:3000/searchDescriptions/?query=${this.state.searchedItem} wikipedia`)
      .then((results) => {
        console.log(results.data)
        let newDescriptions = [];
        for (let i = 0; i < results.data.length; i++) {
          if (results.data[i].snippet === undefined) {
            continue;
          }
          console.log(results.data[i].snippet);
          newDescriptions.push(results.data[i].snippet)
        }
        this.props.handleUpdateMainAppState({
          descriptionSelection: newDescriptions,
          itemDescription: newDescriptions[0]
        })
      })
      .then(() => {
        console.log('I am here')
        this.props.handleShowCreateCardModal();
      })
      .catch((err) => {
        console.error(err);
      })
  }

  handleSearchInputChange(e) {
    this.setState({ searchedItem: e.target.value });
  }

  render() {
    return (
      <div className="user-div">
        <div className="user-photo">

        </div>
        <div className="user-info">
          <h1 className="traveler-name">{this.props.currentTravelerName}</h1>
          <h3 className="point-count">Total Points: {this.props.currentTravelerPoints}</h3>
          <h3 className="friend-count">Friends: {this.props.currentTravelerFriendCount}</h3>
        </div>
        <div className="user-add-card">
          <input type="text" id="search-field" onChange={(e) => { this.handleSearchInputChange(e) }}></input><br></br>
          <button className="search-button" type="submit" onClick={(e) => { this.handleSearchButtonClick(e) }}>Find Or Create Card</button>
        </div>
      </div>
    )
  }
}

export default User;

{/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/38px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg"></img> */ }