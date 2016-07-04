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
  TextInput,
  View,
} from 'react-native';

const textColor = "#FFFFFF"
const lightTextColor = "#777777"
const buttonColor = "rgb(33, 115, 161)"
const inputFieldColor = "rgb(246, 246, 246)"
const buttonWidth = 200

class RegistrationPage extends Component {
  render() {
    return (
      <View>
        <NavigationBar />
        <Personalia /><Divider />
        <Anthropometry /><Divider />
        <Needs/><Divider />
        <Screening/><Divider />
        <SpecialDiet/><Divider />
        <Preferences/>

        <Button text="Registrer" />
      </View>
    );
  }
}

class Personalia extends Component {
  render() {
    return (
      <View>
        <Header text="Personalia" />
        <Question name="navn">
          {
            ["Fornavn", "Mellomnavn", "Etternavn"].map(
              name => <InputField key={name} placeholder={name} />)
          }
        </Question>
        <Question name="Kjønn">
          <Choice choices={["Kvinne", "Mann"]} />
        </Question>
        <Question name="Alder">
          <InputField />
        </Question>
        <Question name="Fødselsnummer">
          <InputField />
        </Question>
      </View>
    );
  }
}

class Anthropometry extends Component {
  render() {
    return (
      <View>
        <Header text="Antropometri" />
        <Question name="Høyde">
          <InputField />
        </Question>
        <Question name="Vekt">
          <InputField />
        </Question>
        <Calculation name="KMI" />
        </View>
    );
  }
}

class Needs extends Component {
  render() {
    return (
      <View>
      <Header text="Behov" />
      <Calculation name="Energi" />
      <Calculation name="Protein" />
      <Calculation name="Væske" />
      </View>
    );
  }
}

class Screening extends Component {
  render() {
    return (
      <View>
      <Header text="Screening" />
      <Question name="Score screening">
        <InputField />
      </Question>
      <Question name="Ernæringsmessig risiko">
        <Choice choices={["Moderat", "Gøy"]} />
      </Question>
      </View>
    );
  }
}

class SpecialDiet extends Component {
  render() {
    return (
      <View>
      <Header text="Spesialkost" />
      <Question>
        <Choice choices={["Nei", "Ja"]} />
        <InputField placeholder="Spesifiser type spesialkost" />
      </Question>
      </View>
    );
  }
}

class Preferences extends Component {
  render() {
    return (
      <View>
      <Header text="Spesielle preferanser" />
      <Question>
        <InputField />
      </Question>
      </View>
    );
  }
}

const Header = ({text}) => (
  <Text>
    {text}
  </Text>
);

const Button = ({text}) => (
  <View style={{marginBottom: 15}}>
  <Text style={{color: 'white', backgroundColor: buttonColor, paddingLeft: 20,
                paddingTop: 8, paddingRight: 20, paddingBottom: 8, fontStyle: 'italic',
                borderRadius: 5, overflow: 'hidden', width: buttonWidth, textAlign: 'center'}}>
    {text}
  </Text>
  </View>
)

const Question = ({text}) => (
  <Text>
    {text}
  </Text>
);

const Calculation = ({text}) => (
  <Text>
    {text}
  </Text>
);

const NavigationBar = () => <Text>Pasientregistrering</Text>;
const Divider = () => <Text>***</Text>;
const Choice = ({choices}) => choices.map(name => <Text>{name}</Text>);

const InputField = ({placeholder}) => (
  <View>
    <TextInput placeholder={placeholder}
               style={{width: buttonWidth, height: 40, backgroundColor: inputFieldColor,
                       borderRadius: 5, fontSize: 13, padding: 10, marginBottom: 15}}/>
  </View>
);




export default RegistrationPage;
