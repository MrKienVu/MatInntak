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
  SegmentedControlIOS,
  ScrollView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import type {
  Kilograms,
  Meter,
} from '../../logic/needs';
import NavigationBar from '../NavigationBar'
import { showFrontPage } from '../../actions';
import { colors } from '../../style';
import NeedsRegistration from './NeedsRegistration';
import {
  Button,
  Divider,
  Header,
  InputField,
  Question,
  Required,
  Section,
} from './common'

class RegistrationPage extends Component {
  state:{weight: ?Kilograms, height: ?Meter};
  constructor() {
    super()
    this.state = {weight: null, height: null}
  }
  setWeight:(weight: Kilograms) => void = (weight) => {
    this.setState({weight});
  };
  setHeight:(height: Meter) => void = (height) => {
    this.setState({height});
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar currentPage="Pasientregistrering" showFrontPage={this.props.showFrontPage} goBack={this.props.showFrontPage} />
        <ScrollView accessibilityLabel="Registreringsskjema" style={{paddingTop: 20}}>
          <Personalia /><Divider />
          <NeedsRegistration height={this.state.height} weight={this.state.weight} setWeight={this.setWeight} setHeight={this.setHeight} /><Divider />
          <Screening/><Divider />
          <SpecialDiet/><Divider />
          <Preferences/>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button text="Registrer" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    showFrontPage: () => dispatch(showFrontPage()),
  }),
)(RegistrationPage);

function doNothing() {
  return;
}

class Personalia extends Component {
  render() {
    return (
      <Section>
        <Header text="Personalia" />
        <Question name="Navn">
          <InputField placeholder="Fornavn" onChange={doNothing}/>
          <InputField placeholder="Mellomnavn" optional={true} onChange={doNothing}/>
          <InputField placeholder="Etternavn" onChange={doNothing} />
        </Question>
        <Question name="Kjønn">
          <Choice label="Kjønn" choices={["Kvinne", "Mann"]} />
        </Question>
        <Question name="Alder">
          <InputField label="Alder" small={true} onChange={doNothing} numeric={true}/>
        </Question>
        <Question name="Fødselsnummer">
          <InputField onChange={doNothing} numeric={true} label="Fødselsnummer"/>
        </Question>
      </Section>
    );
  }
}

const Screening = () => (
  <Section>
  <Header text="Screening" />
  <Question name="Score screening">
    <InputField optional={true} onChange={doNothing} />
  </Question>
  <Question name="Ernæringsmessig risiko">
    <Choice label="Ernæringsmessig risiko" choices={["Moderat", "Gøy"]} optional={true} />
  </Question>
  </Section>
);


const SpecialDiet = () => (
  <Section>
  <Header text="Spesialkost" />
  <Question>
    <Choice label="Spesialkost" choices={["Nei", "Ja"]} />
    <InputField placeholder="Spesifiser type spesialkost" optional={true} onChange={doNothing}/>
  </Question>
  </Section>
);

const Preferences = () => (
  <Section>
  <Header text="Spesielle preferanser" />
  <Question>
    <InputField optional={true} onChange={doNothing}/>
  </Question>
  </Section>
);



const Choice = ({label, choices, optional}) => (
  <View style={{flexDirection: 'row'}}>
    <SegmentedControlIOS
      values={choices}
      style={{flex: 1, height: 30, marginBottom: 10, padding: 20}}
      tintColor= { colors.darkBlue }
      accessibilityLabel={label} />
    <Required optional={optional} />
  </View>
);

export default ConnectedPage;
