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
  computeFluid,
  computeKcal,
  computeProtein,
} from '../logic';
import type {
  BMI,
  Gram,
  Kilograms,
  Kcal,
  Meter,
  Ml,
} from '../logic';
import {
  Divider,
  Header,
  InputField,
  Question,
  Section,
} from './common'
import { fontSize } from '../style'

function roundTwoDecimals(decimal:number) {
  return Math.round(100 * decimal) / 100;
}

function positiveComputedValue(value:?number, compute: (input:number) => number): ?number {
  return value != null ? positiveValue(compute(value)): null;
}

function positiveValue(value:number): ?number {
  return value > 0 ? value: null;
}

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

const NeedsRegistration = (props: {
  height: ?Meter,
  weight: ?Kilograms,
  setWeight: (weight:Kilograms) => void,
  setHeight: (height:Meter) => void,
}) => {
  return (
    <View>
      <Anthropometry weight={props.weight} height={props.height}
                     setWeight={props.setWeight}
                     setHeight={props.setHeight} />
      <Divider />
      <Needs weight={props.weight} />
    </View>
  );
};

export default NeedsRegistration;
