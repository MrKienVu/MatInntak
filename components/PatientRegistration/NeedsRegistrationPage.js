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
  View,
} from 'react-native';
import { connect } from 'react-redux';
import type {
  Kilograms,
  Meter,
} from '../../logic/needs';
import NavigationBar from '../NavigationBar'
import { resetApp, showFeverRegistrationPage, showPreviousPage } from '../../actions';
import NeedsRegistration from './NeedsRegistration';
import { Divider, RegisterButton } from './common';

class NeedsRegistrationPage extends Component {
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
        <NavigationBar currentPage="Registrer behov" showFrontPage={this.props.resetApp} goBack={this.props.showPreviousPage} />
        <View style={{paddingTop: 20}}>
          <NeedsRegistration height={this.state.height} weight={this.state.weight} setHeight={this.setHeight} setWeight={this.setWeight} /><Divider />
        </View>
        <RegisterButton onPress={ this.props.showFeverRegistrationPage } />
      </View>
    );
  }
}

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    resetApp: () => dispatch(resetApp()),
    showFeverRegistrationPage: () => dispatch(showFeverRegistrationPage()),
    showPreviousPage: () => dispatch(showPreviousPage()),
  }),
)(NeedsRegistrationPage);

export default ConnectedPage;
