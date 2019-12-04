import React from 'react';

class ImageSlider extends React.Component{
  constructor(props){
    super(props)
  }

  buildSlider(){
    
  }

  render(){
    return (
      <ul className="" style={{display: 'flex'}}>
        {this.props.meals.map((meal, idx) => <li key={idx}><img alt="" src={meal.imageUrl} /></li>)}
      </ul>
    );
  }
};

export default ImageSlider;
