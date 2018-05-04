# react-native-swipe-gestures

React Native component for handling swipe gestures in up, down, left and right direction.

## Installation

`npm i -S react-native-swipe-gestures`

## Usage

```javascript
'use strict';

import React from 'react';
import {View, Text} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

class SomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff'
    };
  }

  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!', gestureName: 'swipe up'});
  }

  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!', gestureName: 'swipe down'});
  }

  render() {
    return (
      <GestureRecognizer
        onSwipeUp={this.onSwipeUp}
        onSwipeDown={this.onSwipeDown}
      >
        <Text>{this.state.myText}</Text>
        <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
      </GestureRecognizer>
    );
  }
}

export default SomeComponent;
```

## Config

No config

## Methods


#### onSwipeUp()

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |

#### onSwipeDown()

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |
