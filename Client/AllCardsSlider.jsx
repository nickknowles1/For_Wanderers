import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import ItemCardAll from './ItemCardAll.jsx';
import Carousel from 'react-elastic-carousel';

class AllCardsSlider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }

  }

  // componentDidMount() {
  //   this.setState({ items: this.props.allCardsRolodex })
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({ items: this.props.allCardsRolodex })
    }
  }

  render() {
    let items = this.state.items;
    console.log(items);
    return (
      <div className="all-cards-slider-div">
        <Carousel itemsToShow={2} pagination={false}>
          {items.map((item) =>
            <ItemCardAll key={item.place_id}
              name={item.name}
              description={item.description}
              beenHere={item.beenhere}
              wantToGo={item.wanttogo}
              photo={item.photourl}
              allCardsRolodex={this.props.allCardsRolodex}
              handleUpdateMainAppState={this.props.handleUpdateMainAppState} />
          )}
        </Carousel>
      </div>
    )
  }
}

export default AllCardsSlider;