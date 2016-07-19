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
import { registerNeeds, registerPatient, registerFood } from '../actions';

const textColor = '#FFFFFF';
const lightTextColor = '#777777';
const buttonColor = 'rgb(33, 115, 161)';
const inputFieldColor = 'rgb(246, 246, 246)';

const itemWidth = 350;
const itemHeight = 40;
const itemSpaceBetween = 32;
const fontSmall = 26;
const fontMedium = 32;
const fontLarge = 48;
const cornerRadius = 10;

class StartPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LargeHeading text="Matinntak" />
        <SmallHeading text="Skriv inn fødselsnummer" />
        <InputField placeholder="11 siffer" />
        <Button text="Start matregistrering" onPress={this.props.registerFood}/>
        <SeparatorText text="eller" />
        <Button text="Registrer behov" onPress={this.props.registerNeeds}/>
        <Button text="Registrer ny pasient" onPress={this.props.registerPatient} explanation="(kun for sykepleier)" />
      </View>
    );
  }
}

const LargeHeading = ({text}) => (
  <Text style={{color: textColor, fontSize: fontLarge, marginBottom: itemSpaceBetween * 3, fontWeight: 'bold'}}>
    {text}
  </Text>
);

const SmallHeading = ({text}) => (
  <Text style={{color: textColor, fontSize: fontMedium, marginBottom: itemSpaceBetween, fontWeight: 'bold'}}>
    {text}
  </Text>
);

const SeparatorText = ({text}) => (
  <Text style={{color: textColor, fontSize: fontSmall, marginBottom: itemSpaceBetween, fontStyle: 'italic'}}>
    {text}
  </Text>
);

const InputField = ({placeholder}) => (
  <View>
    <TextInput accessibilityLabel='Fødselsnummer'
               keyboardType={'number-pad'}
               placeholder={placeholder}
               style={{backgroundColor: inputFieldColor,
                       borderRadius: cornerRadius,
                       fontSize: fontSmall,
                       height: itemHeight,
                       marginBottom: itemSpaceBetween,
                       paddingHorizontal: 16,
                       paddingVertical: 32,
                       width: itemWidth}}/>
  </View>
);

const Button = ({text, explanation, onPress}) => (
  <View style={{marginBottom: itemSpaceBetween}}>
  <Text style={{backgroundColor: buttonColor,
                borderRadius: cornerRadius,
                color: textColor,
                fontSize: fontSmall,
                overflow: 'hidden',
                paddingVertical: 12,
                textAlign: 'center',
                width: itemWidth}}
         onPress={onPress}>
    {text}
  </Text>
  {
    explanation &&
    <Text style={{fontSize: fontSmall, color: lightTextColor, textAlign: 'center', marginTop: 4}}>
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
});

const ConnectedApp = connect(
  state => ({
    routing: state.routing,
  }),
  (dispatch) => ({
    registerNeeds: () => dispatch(registerNeeds()),
    registerPatient: () => dispatch(registerPatient()),
    registerFood: () => dispatch(registerFood()),
  }),
)(StartPage);

export default ConnectedApp;
