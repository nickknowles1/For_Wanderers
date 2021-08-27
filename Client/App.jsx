import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";

import NavBar from './NavBar.jsx';
import User from './User.jsx';
import CollectedSlider from './CollectedSlider.jsx';
import AllCardsSlider from './AllCardsSlider.jsx';
import ItemCardAll from './ItemCardAll.jsx';
import CreateCardModal from './CreateCardModal.jsx';
import CardModal from './CardModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTravelerID: 1,
      currentTravelerName: 'nickknowles1',
      currentTravelerFriends: [],
      currentTravelerFriendCount: 0,
      currentTravelerPoints: 0,
      currentTravelerPlaces: [],
      currentCard: {},
      photoSelection: [],
      photoIndex: 0,
      descIndex: 0,
      photo: '',
      allCardsRolodex: [],
      userCardsRolodex: [],
      showCreateCardModal: false,
      showCardModal: false,
      itemSearch: '',
      itemDescription: '',
      descriptionSelection: []
    }
    this.updateAllCardsSlider = this.updateAllCardsSlider.bind(this);
    this.updateCollectedCardsSlider = this.updateCollectedCardsSlider.bind(this);
    this.handleShowCreateCardModal = this.handleShowCreateCardModal.bind(this);
    this.handleHideCreateCardModal = this.handleHideCreateCardModal.bind(this);
    this.handleShowCardModal = this.handleShowCardModal.bind(this);
    this.handleHideCardModal = this.handleHideCardModal.bind(this);
    this.handleUpdateMainAppState = this.handleUpdateMainAppState.bind(this);
  }

  handleUpdateMainAppState(newState) {
    this.setState(newState);
  }

  componentDidMount() {
    //console.log('I am running this function')
    this.updateCollectedCardsSlider();
    this.updateAllCardsSlider();
  }

  // componentDidUpdate() {
  //   console.log('I have updated')
  //   console.log(this.state.allCardsRolodex);
  // }

  updateCollectedCardsSlider() {
    axios.get(`http://localhost:3000/getUserCards/?travelerID=${this.state.currentTravelerID}`)
      .then((results) => {
        results.data.map((item) => {
          item.date = new Date(item.date);
        })
        results.data.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          } else {
            return 1;
          }
        });
        this.setState({ userCardsRolodex: results.data })
        console.log(this.state.userCardsRolodex);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  updateAllCardsSlider() {
    axios.get(`http://localhost:3000/getAllCards`)
      .then((results) => {
        results.data.map((item) => {
          item.date = new Date(item.date);
        })
        results.data.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          } else {
            return -1;
          }
        });
        this.setState({ allCardsRolodex: results.data })

      })
      .catch((err) => {
        console.error(err);
      })
  }

  handleShowCreateCardModal() {
    this.setState({
      showCreateCardModal: true
    })
  }

  handleHideCreateCardModal() {
    document.getElementById('search-field').value = '';
    this.setState({
      showCreateCardModal: false
    })
  }

  handleShowCardModal() {
    this.setState({
      showCardModal: true
    })
  }

  handleHideCardModal() {
    this.setState({
      showCardModal: false
    })
  }

  render() {
    return (
      <div className="main-div" >
        <CreateCardModal photo={this.state.photo}
          show={this.state.showCreateCardModal}
          updateAllCardsSlider={this.updateAllCardsSlider}
          handleHideCreateCardModal={this.handleHideCreateCardModal}
          handleUpdateMainAppState={this.handleUpdateMainAppState}
          photoSelection={this.state.photoSelection}
          descriptionSelection={this.state.descriptionSelection}
          photoIndex={this.state.photoIndex}
          descIndex={this.state.descIndex}
          photo={this.state.photo}
          itemSearch={this.state.itemSearch}
          itemDescription={this.state.itemDescription} />
        <CardModal photo={this.state.photo}
          show={this.state.showCardModal}
          updateAllCardsSlider={this.updateAllCardsSlider}
          handleHideCardModal={this.handleHideCardModal}
          handleUpdateMainAppState={this.handleUpdateMainAppState}
          updateCollectedCardsSlider={this.updateCollectedCardsSlider}
          allCardsRolodex={this.state.allCardsRolodex}
          photoSelection={this.state.photoSelection}
          photoIndex={this.state.photoIndex}
          photo={this.state.photo}
          itemSearch={this.state.itemSearch}
          currentCard={this.state.currentCard}
          currentTravelerID={this.state.currentTravelerID} />
        <NavBar />
        <User handleShowCreateCardModal={this.handleShowCreateCardModal}
          handleUpdateMainAppState={this.handleUpdateMainAppState}
          allCardsRolodex={this.state.allCardsRolodex}
          currentTravelerName={this.state.currentTravelerName}
          currentTravelerFriendCount={this.state.currentTravelerFriendCount}
          currentTravelerPoints={this.state.currentTravelerPoints} />
        <CollectedSlider photo={this.state.photo}
          userCardsRolodex={this.state.userCardsRolodex} />
        <AllCardsSlider allCardsRolodex={this.state.allCardsRolodex}
          handleUpdateMainAppState={this.handleUpdateMainAppState} />
      </div>
    )
  }
}




ReactDOM.render(<App />, document.getElementById("app"));