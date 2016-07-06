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
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  computeBMI,
  computeFluid,
  computeKcal,
  computeProtein,
} from '../logic';
import type {
  Kilograms,
  Kcal,
  Meter,
  Gram,
  Ml,
  BMI,
} from '../logic';
import NavigationBar from './NavigationBar'
import { showFrontPage } from '../actions';
import { colors, fontSize } from '../style';

class RegistrationPage extends Component {
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
        <NavigationBar currentPage="Pasientregistrering" showFrontPage={this.props.showFrontPage} goBack={this.props.showFrontPage} />
        <ScrollView accessibilityLabel="Registreringsskjema" style={{paddingTop: 20}}>
          <Personalia /><Divider />
          <Anthropometry weight={this.state.weight} height={this.state.height}
                         setWeight={this.setWeight}
                         setHeight={this.setHeight} /><Divider />
          <Needs weight={this.state.weight} /><Divider />
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
  (state) => ({}),
  (dispatch) => ({
    showFrontPage: () => dispatch(showFrontPage()),
  }),
)(RegistrationPage);

function doNothing(value: number) {
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

function roundTwoDecimals(decimal:number) {
  return Math.round(100 * decimal) / 100;
}

function positiveComputedValue(value:?number, compute: (input:number) => number): ?number {
  return value != null ? positiveValue(compute(value)): null;
}

function positiveValue(value:number): ?number {
  return value > 0 ? value: null;
}

const Anthropometry = (props: {
  height: ?Meter,
  weight: ?Kilograms,
  setWeight: (weight:Kilograms) => void,
  setHeight: (height:Meter) => void,
}) => {
  const bmi: ?BMI = props.weight && props.height &&
    positiveValue(roundTwoDecimals(computeBMI(props.weight, props.height)));
  return (
    <Section>
      <Header text="Antropometri" />
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Question name="Høyde">
            <InputField label="Høyde" onChange={(value) => props.setHeight(value)} small={true} numeric={true} />
          </Question>
        </View>
        <View style={{flex: 1}}>
        <Question name="Vekt">
          <InputField label="Vekt" onChange={(value) => props.setWeight(value)} small={true} numeric={true} />
        </Question>
        </View>
        <View style={{flex: 1}}>
        <Calculation name="KMI" value={ bmi }/>
        </View>
      </View>
      </Section>
  );
};

const Needs = (props: { weight: ?Kilograms} ) => {
  const energyNeed: ?Kcal = positiveComputedValue(props.weight, computeKcal);
  const proteinNeed: ?Gram = positiveComputedValue(props.weight, computeProtein);
  const fluidNeed: ?Ml = positiveComputedValue(props.weight, computeFluid);

  const needs = [
    ["Energi", energyNeed],
    ["Protein", proteinNeed],
    ["Væske", fluidNeed],
  ];

  return (
    <Section>
    <Header text="Behov" />
    <View style={{flexDirection: 'row'}}>{
        needs.map(need => (
          <View key={need[0]} style={{flex: 1}}>
            <Calculation name={need[0]} value={need[1]}/>
          </View>
        ))}
    </View>
    </Section>
  );
};

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


const Section = ({children}) => (
  <View style={{marginLeft: 30, marginRight: 30}}>
    {children}
  </View>
);

const Header = ({text}) => (
  <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 32, marginBottom: 20}}>
    {text}
  </Text>
);

const Button = ({text}) => (
  <View style={{marginBottom: 15}}>
  <Text style={{marginTop: 60, fontSize: fontSize.small, color: colors.white, backgroundColor: colors.deepBlue, paddingLeft: 20,
                paddingTop: 16, paddingRight: 20, paddingBottom: 16, fontStyle: 'italic',
                borderRadius: 5, overflow: 'hidden', width: 250, textAlign: 'center'}}>
    {text}
  </Text>
  </View>
)

const Question = ({name, children, style}) => (
  <View accessibilityLabel={name}>
  {name &&
    <Text style={[{fontSize: fontSize.small, marginBottom: 20}, style]}>
      {name}:
    </Text>
  }
  {children}
  </View>
);

const Calculation = (props: {name: string, value: ?any}) => (
  <View>
    <Text style={{fontSize: fontSize.small, marginBottom: 20}}>
      {props.name}:
    </Text>
    <Text style={{fontSize: fontSize.small}}>{props.value || '-'}</Text>

  </View>
);

const Divider = () => <View style={{marginTop: 30, height: 6, backgroundColor: colors.divider}}/>;

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

const Required = ({optional}) => (
  <View style={{marginHorizontal: 8, width: 10}}>
    {!optional &&
      <Text style={{color: colors.red, fontSize: fontSize.small}}>*</Text>
    }
  </View>
);

const InputField = (props: { optional?: boolean, small?: boolean, numeric?: boolean, label?: string, placeholder?: string, onChange: (value: number) => void}) => (
  <View style={{flexDirection: 'row'}}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TextInput onChange={(event) => props.onChange(event.nativeEvent.text)} placeholder={props.placeholder || ""}
                 style={{width: props.small ? 140 : 685, height: 60, backgroundColor: colors.inputFieldBackground,
                        borderRadius: 8, fontSize: fontSize.small, padding: 10, marginBottom: 15,
                       borderColor: colors.inputFieldBorder, borderWidth: 3}}
                 keyboardType={props.numeric ? 'number-pad' : 'default'}
                 accessibilityLabel={props.label || props.placeholder }
                       />
      <Required optional={props.optional} />
    </View>
  </View>
);

export default ConnectedPage;
