'use strict';

import React from 'react';
import {PanResponder, ScrollView} from 'react-native';

const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
};

class GestureRecognizer extends React.Component {

  constructor(props) {
    super(props);

    this.getSwipeDirection = this.getSwipeDirection.bind(this);
    this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this);
    this.isValidSwipe = this.isValidSwipe.bind(this);
    this.triggerSwipeHandlers = this.triggerSwipeHandlers.bind(this);
    this.handleShouldSetPanResponder = this.handleShouldSetPanResponder.bind(this);
    this.gestureIsClick = this.gestureIsClick.bind(this);
  }

  componentWillMount() {
     this.panResponder = PanResponder.create({
       onStartShouldSetPanResponder: this.handleShouldSetPanResponder,
       onMoveShouldSetPanResponder: this.handleShouldSetPanResponder,
       onPanResponderRelease: this.handlePanResponderEnd,
       onPanResponderTerminate: this.handlePanResponderEnd,
     });
   };

   getSwipeDirection(gestureState) {
     const { SWIPE_UP, SWIPE_DOWN } = SWIPE_DIRECTION;
     const { dy } = gestureState;

     if (this.isValidSwipe(gestureState)) {
       return (dy > 0) ? SWIPE_DOWN : SWIPE_UP;
     }
     return null;
   }

   isValidSwipe(gestureState) {
     const { dy, dx } = gestureState;
     return Math.abs(dy) > Math.abs(dx);
   }

   handlePanResponderEnd (evt, gestureState) {
     const swipeDirection = this.getSwipeDirection(gestureState);
     this.triggerSwipeHandlers(swipeDirection, gestureState);
   }

   triggerSwipeHandlers(swipeDirection, gestureState) {
     const { onSwipeUp, onSwipeDown } = this.props;
     const { SWIPE_UP, SWIPE_DOWN } = SWIPE_DIRECTION;

     switch (swipeDirection) {
       case SWIPE_UP:
         if (onSwipeUp) {
           onSwipeUp(gestureState);
         }
         break;
       case SWIPE_DOWN:
         if (onSwipeDown) {
           onSwipeDown(gestureState);
         }
         break;
       default:
         break;
     }
   }

   handleShouldSetPanResponder(evt, gestureState) {
     return evt.nativeEvent.touches.length === 1 && !this.gestureIsClick(gestureState);
   }

   gestureIsClick(gestureState) {
     return  Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5;
   }

  render() {
    return (
      <ScrollView bounces={false} {...this.panResponder.panHandlers}>
        {this.props.children}
      </ScrollView>
    );
  }
}

export default GestureRecognizer;
