/*
 * Copyright (c) 2016, University of Oslo, Norway All rights reserved.
 *
 * This file is part of "UiO Software Information Inventory".
 *
 * "UiO Software Information Inventory" is free software: you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at
 * your option) any later version.
 *
 * "UiO Software Information Inventory" is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License along with "UiO Software Information Inventory". If
 * not, see <http://www.gnu.org/licenses/>
 *
 * @flow
 *
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { decrement, increment } from './actions';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          My first value is: {this.props.firstValue}
        </Text>
        <Text style={styles.instructions} onPress={this.props.increment}>
          Press here to increment.
        </Text>
        <Text style={styles.welcome}>
          My second value is: {this.props.secondValue}
        </Text>
        <Text style={styles.instructions} onPress={this.props.decrement}>
          Press here to decrement.
        </Text>
        <Text style={styles.instructions}>
          iOS:{'\n'} Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text style={styles.instructions}>
          Android:{'\n'} shake or press menu button for dev menu
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


const ConnectedApp = connect(
  state => ({
    firstValue: state.firstReducer.value,
    secondValue: state.secondReducer.value,
  }),
  (dispatch) => ({
    increment: () => dispatch(increment(0)),
    decrement: () => dispatch(decrement(1)),
  }),
)(App);

export default ConnectedApp;
