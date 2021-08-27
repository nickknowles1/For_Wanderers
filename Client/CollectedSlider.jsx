import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import ItemCardUser from './ItemCardUser.jsx';
import Carousel from 'react-elastic-carousel';

class CollectedSlider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [
        { id: 1, title: 'item #1' },
        { id: 2, title: 'item #2' },
        { id: 3, title: 'item #3' },
        { id: 4, title: 'item #4' },
        { id: 5, title: 'item #5' },
        { id: 6, title: 'item #6' },
        { id: 7, title: 'item #7' },
        { id: 8, title: 'item #8' },
        { id: 9, title: 'item #9' },
        { id: 10, title: 'item #10' },
        { id: 11, title: 'item #11' },
        { id: 12, title: 'item #12' },
        { id: 13, title: 'item #13' },
        { id: 14, title: 'item #14' },
        { id: 15, title: 'item #15' }
      ]
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    axios.get(`http://localhost:3000/createNew/?query=taj mahal`)
      .then((results) => {
        console.log(results.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    let items = this.props.userCardsRolodex;
    console.log(items);
    return (
      <div className="collected-slider-div">
        <Carousel itemsToShow={2} pagination={false}>
          {items.map((item) => <ItemCardUser key={item.place_id}
            item={item} />)}
        </Carousel>
      </div>
    )
  }
}

{/* <ItemCardUser key={item.id} /> */ }

export default CollectedSlider;

{/* <input type="submit" className="submit" onClick={(e) => { this.handleSubmit(e) }} /> */ }
{/* <ItemCard photo={this.props.photo} /> */ }