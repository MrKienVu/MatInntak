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
import { showFrontPage } from '../actions';

const buttonColor = "rgb(33, 115, 161)"
const inputFieldColor = "rgb(246, 246, 246)"
const buttonWidth = 250
const fontSmall = 26;

class RegistrationPage extends Component {
  state:{weight: ?Kilograms, height: ?Meter};
  constructor() {
    super()
    this.state = {weight: null, height: null}
  }

  setWeight:(weight:number) => void = (weight) => {
    this.setState({weight});
    console.log(this.state);
  };

  setHeight:(height:number) => void = (height) => {
    this.setState({height});
    console.log(this.state);
  };

  render() {
    console.log(this.props);
    return (
      <View style={{flex: 1}}>
        <NavigationBar showFrontPage={this.props.showFrontPage} />
        <ScrollView style={{paddingTop: 20}}>
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

class Personalia extends Component {
  render() {
    return (
      <Section>
        <Header text="Personalia" />
        <Question name="Navn">
          <InputField placeholder="Fornavn" />
          <InputField placeholder="Mellomnavn" optional={true} />
          <InputField placeholder="Etternavn" />
        </Question>
        <Question name="Kjønn">
          <Choice choices={["Kvinne", "Mann"]} />
        </Question>
        <Question name="Alder">
          <InputField small={true}/>
        </Question>
        <Question name="Fødselsnummer">
          <InputField />
        </Question>
      </Section>
    );
  }
}

function roundTwoDecimals(decimal:number) {
  return Math.round(100 * decimal) / 100;
}

function positiveComputedValue(value:?number, compute: (input:number) => number) {
  return value != null && positiveValue(compute(value));
}

function positiveValue(value:number) {
  return value > 0 && value;
}

class Anthropometry extends Component {
  props: {
    height: ?Meter,
    weight: ?Kilograms,
    setWeight: (weight:Kilograms) => void,
    setHeight: (height:Meter) => void,
  };
  render() {
    return (
      <Section>
        <Header text="Antropometri" />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Question name="Høyde">
              <InputField onChange={(value) => this.props.setHeight(value)} small={true}/>
            </Question>
          </View>
          <View style={{flex: 1}}>
          <Question name="Vekt">
            <InputField onChange={(value) => this.props.setWeight(value)} small={true}/>
          </Question>
          </View>
          <View style={{flex: 1}}>
          <Calculation name="KMI" value={ this.props.weight && this.props.height ?
            positiveValue(roundTwoDecimals(computeBMI(this.props.weight, this.props.height))) : '-'}/>
          </View>
        </View>
        </Section>
    );
  }
}

class Needs extends Component {
  props: { weight:?Kilograms };
  render() {
    const energyNeed: Kcal | boolean = positiveComputedValue(this.props.weight, computeKcal);
    const proteinNeed: Gram | boolean = positiveComputedValue(this.props.weight, computeProtein);
    const fluidNeed: Ml | boolean = positiveComputedValue(this.props.weight, computeFluid);

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
  }
}

class Screening extends Component {
  render() {
    return (
      <Section>
      <Header text="Screening" />
      <Question name="Score screening">
        <InputField optional={true} />
      </Question>
      <Question name="Ernæringsmessig risiko">
        <Choice choices={["Moderat", "Gøy"]} optional={true} />
      </Question>
      </Section>
    );
  }
}

class SpecialDiet extends Component {
  render() {
    return (
      <Section>
      <Header text="Spesialkost" />
      <Question>
        <Choice choices={["Nei", "Ja"]} />
        <InputField placeholder="Spesifiser type spesialkost" optional={true} />
      </Question>
      </Section>
    );
  }
}

class Preferences extends Component {
  render() {
    return (
      <Section>
      <Header text="Spesielle preferanser" />
      <Question>
        <InputField optional={true} />
      </Question>
      </Section>
    );
  }
}

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
  <Text style={{marginTop: 60, fontSize: 25, color: 'white', backgroundColor: buttonColor, paddingLeft: 20,
                paddingTop: 16, paddingRight: 20, paddingBottom: 16, fontStyle: 'italic',
                borderRadius: 5, overflow: 'hidden', width: buttonWidth, textAlign: 'center'}}>
    {text}
  </Text>
  </View>
)

const Question = ({name, children, style}) => (
  <View>
  {name &&
    <Text style={[{fontSize: 25, marginBottom: 20}, style]}>
      {name}:
    </Text>
  }
  {children}
  </View>
);

const Calculation = (props: {name: string, value: ?any}) => (
  <View>
    <Text style={{fontSize: 25, marginBottom: 20}}>
      {props.name}:
    </Text>
    <Text style={{fontSize: 25}}>{props.value || '-'}</Text>

  </View>
);

const NavigationBar = ({showFrontPage}) => (
  <View style={{backgroundColor: "#17364B", paddingTop: 50, paddingBottom: 30, paddingLeft: 20, paddingRight: 20}}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <BackLink />
      </View>
      <View style={{flex: 2}}>

      </View>
      <View style={{flex: 1}}>
        <FrontPageLink showFrontPage={showFrontPage} />
      </View>
    </View>

    <Text style={{color: 'white', textAlign: 'center', fontSize: 35, fontWeight: 'bold', marginTop: 25}}>
      Pasientregistrering
    </Text>
  </View>
);

const BackLink = () => (
  <Text style={{color: 'white', fontSize: 25, textAlign: 'center'}}>
  Tilbake
  </Text>
);

const FrontPageLink = ({showFrontPage}) => (
  <Text onPress={showFrontPage} style={{color: 'white', fontSize: 25, textAlign: 'center'}}>
  Til forsiden
  </Text>
);

const Divider = () => <View style={{marginTop: 30, height: 6, backgroundColor: "rgb(235, 235, 235)"}}/>;

const Choice = ({choices, optional}) => (
  <View style={{flexDirection: 'row'}}>
    <SegmentedControlIOS values={choices}
      style={{flex: 1, height: 30, marginBottom: 10, padding: 20}}
      tintColor= '#17364B'/>
      <Required optional={optional} />
  </View>
);

const Required = ({optional}) => (
  <View style={{marginHorizontal: 8, width: 10}}>
    {!optional &&
      <Text style={{color: 'red', fontSize: fontSmall}}>*</Text>
    }
  </View>
);

const InputField = ({placeholder, small, optional, onChange}) => (
  <View style={{flexDirection: 'row'}}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TextInput onChange={(event) => onChange(event.nativeEvent.text)} placeholder={placeholder || ""}
                 style={{width: small ? 140 : 685, height: 60, backgroundColor: inputFieldColor,
                        borderRadius: 8, fontSize: 25, padding: 10, marginBottom: 15,
                       borderColor: "rgb(215, 215, 215)", borderWidth: 3}}/>
      <Required optional={optional} />
    </View>
  </View>
);

export default ConnectedPage;
