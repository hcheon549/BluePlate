/**
 * 
 * Component used to display FAQ question and answer.
 * 
 */

import React, { Component } from 'react';
import PointerUpDown from '../element/PointerUpDown';

export default class FAQQuestion extends Component{
  constructor(props){
    super(props);
    this.state = {
      showAnswer: false
    };
    this.toggleAnswer = this.toggleAnswer.bind(this);
  }

  toggleAnswer(){ 
    this.setState({showAnswer: !this.state.showAnswer}); 
  }

  render(){
    
    return(
      <li className={'faqsQuestion' + (this.state.showAnswer ? ' selected' : '')}
        onClick={this.toggleAnswer}
      >
        <div className="questionHeader">
          <span>{this.props.question}</span>
          <PointerUpDown />
        </div>
        {this.state.showAnswer && <div className="faqsAnswer">
          {this.props.answer}
        </div>}
      </li>
    );
  }
}