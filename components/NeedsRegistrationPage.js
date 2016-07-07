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
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import type {
  Kilograms,
  Meter,
} from '../logic';
import NavigationBar from './NavigationBar'
import { showFrontPage } from '../actions';
import { colors, fontSize } from '../style';
import NeedsRegistration from './NeedsRegistration'

class RegistrationNeeds extends Component {
  state:{weight: ?Kilograms, height: ?Meter};
  constructor() {
    super()
    this.state = {weight: null, height: null}
  }
  setWeight:(weight:number) => void = (weight) => {
    this.setState({weight});
  };
  setHeight:(height:number) => void = (height) => {
    this.setState({height});
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar currentPage="Registrer behov" showFrontPage={this.props.showFrontPage} goBack={this.props.showFrontPage} />
        <View style={{paddingTop: 20}}>
        <NeedsRegistration height={this.state.height} weight={this.state.weight} setHeight={this.setHeight} setWeight={this.setWeight} /><Divider />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button text="Registrer" />
        </View>
        </View>
      </View>
    );
  }
}

const Divider = () => <View style={{marginTop: 30, height: 6, backgroundColor: colors.divider}}/>;

const Button = ({text}) => (
  <View style={{marginBottom: 15}}>
  <Text style={{marginTop: 60, fontSize: fontSize.small, color: colors.white, backgroundColor: colors.deepBlue, paddingLeft: 20,
                paddingTop: 16, paddingRight: 20, paddingBottom: 16, fontStyle: 'italic',
                borderRadius: 5, overflow: 'hidden', width: 250, textAlign: 'center'}}>
    {text}
  </Text>
  </View>
)

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    showFrontPage: () => dispatch(showFrontPage()),
  }),
)(RegistrationNeeds);

export default ConnectedPage;
