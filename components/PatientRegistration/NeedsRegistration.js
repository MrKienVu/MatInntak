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

import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  computeBMI,
} from '../../logic/needs';
import type {
  BMI,
  Gram,
  Kilograms,
  Kcal,
  Meter,
  Ml,
} from '../../logic/needs';
import {
  Divider,
  Header,
  InputField,
  Question,
  Section,
} from './common'
import { fontSize } from '../../style'
import {
  roundTwoDecimals,
  positiveValue,
} from '../../logic/needs';

const Calculation = (props: {name: string, value: ?any}) => (
  <View>
    <Text style={{fontSize: fontSize.small, marginBottom: 20}}>
      {props.name}:
    </Text>
    <View accessibilityLabel={props.name}>
      <Text style={{fontSize: fontSize.small}}>
      {props.value || '-'}</Text>
    </View>

  </View>
);

const Anthropometry = (props: {
  height: ?Meter,
  weight: ?Kilograms,
  setWeight: (weight: Kilograms) => void,
  setHeight: (height: Meter) => void,
  calculateNeeds: (weight: Kilograms) => void,
}) => {
  const bmi: ?BMI = props.weight && props.height &&
    positiveValue(roundTwoDecimals(computeBMI(props.weight, props.height)));
  return (
    <Section>
      <Header text="Antropometri" />
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Question name="Høyde">
            <InputField label="Høyde" onChange={(value) => { props.setHeight(value) }}
                        small={true} numeric={true}
            />
          </Question>
        </View>
        <View style={{flex: 1}}>
        <Question name="Vekt">
          <InputField label="Vekt" onChange={(weight) => {
            props.setWeight(weight)
            props.calculateNeeds(weight)
          }} small={true} numeric={true} />
        </Question>
        </View>
        <View style={{flex: 1}}>
        <Calculation name="KMI" value={ bmi }/>
        </View>
      </View>
      </Section>
  );
};

const Needs = (props: {
  energy: ?Kcal,
  fluid: ?Ml,
  protein: ?Gram,
}) => {
  const needs = [
    ["Energi", props.energy],
    ["Protein", props.protein],
    ["Væske", props.fluid],
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

const NeedsRegistration = (props: {
  height: ?Meter,
  weight: ?Kilograms,
  setWeight: (weight:Kilograms) => void,
  setHeight: (height:Meter) => void,
  calculateNeeds: (weight: Kilograms) => void,
  energyNeed: ?Kcal,
  fluidNeed: ?Ml,
  proteinNeed: ?Gram,
}) => {
  return (
    <View>
      <Anthropometry weight={props.weight}
                     height={props.height}
                     setWeight={props.setWeight}
                     setHeight={props.setHeight}
                     calculateNeeds={props.calculateNeeds} />
      <Divider />
      <Needs energy={props.energyNeed}
             fluid={props.fluidNeed}
             protein={props.proteinNeed} />
    </View>
  );
};

export default NeedsRegistration;
