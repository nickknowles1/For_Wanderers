import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";

class ItemCardUser extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="item-card-div"
        style={{
          backgroundImage: `url(${this.props.item.photourl})`,
          backgroundRepeat: `no-repeat`, backgroundPosition: `center`,
          backgroundSize: `cover`
        }}
        onClick={(e) => { this.handleCardClick(e) }}>
        <h3 className="create-card-name">{this.props.item.name}</h3>
        {/* <h5>{this.props.item.description}</h5> */}
        <h5>Been Here: {this.props.item.beenhere}</h5>
        <h5>Want To Go: {this.props.item.wanttogo}</h5>
      </div>

    )
  }
}

export default ItemCardUser;

//  <div className="item-card-div" style={{ backgroundImage: `url(${this.props.photo})`, backgroundSize: `cover` }}>
//   <h3>place name</h3>
//   <h3>description</h3>
//   <h5>Been Here: "some number"</h5>
//   <h5>Want To Go: "some number"</h5>
// </div >

{/* <div className="item-card-div" style={{ backgroundImage: `url(${this.props.photo})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}>
        <h3 className="create-card-name">{this.props.name}</h3>
        <h5>{this.props.description}</h5>
        <h5>Been Here: {this.props.beenHere}</h5>
        <h5>Want To Go: {this.props.wantToGo}</h5>
      </div> */}

      // <div className="item-card-div" style={{
      //   backgroundImage: `url(${this.props.item.photourl})`,
      //   backgroundSize: `cover`
      // }}>
      //   <h3>place name</h3>
      //   <h3>description</h3>
      //   <h5>Been Here: "some number"</h5>
      //   <h5>Want To Go: "some number"</h5>
      // </div>