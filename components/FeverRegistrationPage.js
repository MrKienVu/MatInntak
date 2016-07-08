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
import NavigationBar from './NavigationBar'
import { showFrontPage, showPreviousPage } from '../actions';
import { Divider, RegisterButton, YesNoQuestionWithTextField } from './common';

class FeverRegistrationPage extends Component {
  state: { degrees: ?Celcius };
  constructor() {
    super()
    this.state = { degrees: null }
  }
  setFever: (degrees: Celcius) => void = (degrees) => {
    this.setState({degrees});
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar currentPage="Registrer feber" showFrontPage={this.props.showFrontPage} goBack={this.props.showPreviousPage} />
        <View style={{paddingTop: 20}}>
          <FeverRegistration degrees={this.state.degrees} setFever={this.setFever} /><Divider />
          <RegisterButton onPress={()=> {return;}} />
        </View>
      </View>
    );
  }
}

const FeverRegistration = () => (
  <YesNoQuestionWithTextField label="Feber" textFieldCaption="Spesifiser antall grader" />
);


const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    showFrontPage: () => dispatch(showFrontPage()),
    showPreviousPage: () => dispatch(showPreviousPage()),
  }),
)(FeverRegistrationPage);

export default ConnectedPage;
