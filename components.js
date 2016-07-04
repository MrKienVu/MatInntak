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
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { decrement, increment } from './actions';

const textColor = "#FFFFFF"
const lightTextColor = "#777777"
const buttonColor = "rgb(33, 115, 161)"
const inputFieldColor = "rgb(246, 246, 246)"
const buttonWidth = 200

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LargeHeading text="Matinntak" />
        <SmallHeading text="Skriv inn fødselsnummer" />
        <InputField placeholder="11 siffer" />
        <Button text="Start matregistrering" />
        <SeparatorText text="eller" />
        <Button text="Registrer behov" />
        <Button text="Registrer ny pasient" explanation="(kun for sykepleier)" />
      </View>
    );
  }
}

const LargeHeading = ({text}) => (
  <Text style={{color: textColor, fontSize: 25, marginBottom: 50, fontWeight: 'bold'}}>
    {text}
  </Text>
);

const SmallHeading = ({text}) => (
  <Text style={{color: textColor, fontSize: 18, marginBottom: 20, fontWeight: 'bold'}}>
    {text}
  </Text>
);

const SeparatorText = ({text}) => (
  <Text style={{color: textColor, marginBottom: 20, fontStyle: 'italic'}}>
    {text}
  </Text>
);

const InputField = ({placeholder}) => (
  <View>
    <TextInput placeholder={placeholder} style={{width: buttonWidth, height: 30, backgroundColor: inputFieldColor, borderRadius: 5, fontSize: 11, padding: 10, marginBottom: 20}}/>
  </View>
);

const Button = ({text, explanation}) => (
  <View style={{marginBottom: 20}}>
  <Text style={{color: textColor, backgroundColor: buttonColor, paddingLeft: 20,
                paddingTop: 5, paddingRight: 20, paddingBottom: 5,
                borderRadius: 5, overflow: 'hidden', width: buttonWidth, textAlign: 'center'}}>
    {text}
  </Text>
  {
    explanation &&
    <Text style={{color: lightTextColor, textAlign: 'center', marginTop: 3}}>
      {explanation}
    </Text>
  }
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17364B',
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
