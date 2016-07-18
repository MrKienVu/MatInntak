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
  Image,
  PanResponder,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressCircle from './ProgressCircle';
import { colors, fontSize } from '../../style';
import NavigationBar from '../NavigationBar';
import { showPreviousPage, registerFood } from '../../actions';
import type { Gram, Kcal } from '../../logic/needs';

function upperCaseFirst(string: string) {
  return string[0].toUpperCase() + string.slice(1);
};

const LOCALE = 'nb-NO';

function formatDate(date: Date): string {
  return date.toLocaleDateString(LOCALE, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
};

function formatTime(time: Date): string {
  return time.toLocaleTimeString(LOCALE, {hour: '2-digit', minute: '2-digit'});
};

const TodaysIntakePage = ({goBack, showFrontPage}) => (
  <View style={{flex: 1}}>
    <NavigationBar currentPage="Dagens inntak"
                   caption={ upperCaseFirst(formatDate(new Date())) }
                   goBack={goBack}
                   showFrontPage={showFrontPage} />
    <TodaysIntake style={{marginTop: 30, marginBottom: 20}}/>
    <ScrollView style={{flex: 1}}>
      <MealDrawerChest style={{marginTop: 20}} />
    </ScrollView>
  </View>
);

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    goBack: () => dispatch(showPreviousPage()),
    showFrontPage: () => dispatch(registerFood()),
  }),
)(TodaysIntakePage);

const TodaysIntake = ({style}) => (
  <View style={{flexDirection:'column',
                alignItems: 'center',
                ...style,
               }}>
    <IntakeIndicator indicators={[
                                {color: colors.redOrange, progress: 1},
                                {color: colors.deepBlue, progress: 0.75},
                                {color: colors.lightGreen, progress: 0.25},
                                ]} />
    <NutritientStatuses style={{marginTop: 20}} />
  </View>
);

const IntakeIndicatorCircle = ({color, progress}) => (
  <ProgressCircle style={{flexDirection: 'row', justifyContent: 'center'}}
                  size={160}
                  progress={progress}
                  color={color}
                  borderColor={colors.divider}
                  borderWidth={2}
                  secondaryText="av dagens mål"
                  thickness={8}
                  textStyle={{color:colors.black, fontSize: fontSize.ordinaryText}}
                  percentageStyle={{color:colors.black, fontSize: 40, fontWeight: '600'}} />
);

function isLeftSwipe(gesture, limit=0): boolean {
  return gesture.dx < -limit;
}

function isRightSwipe(gesture, limit=0): boolean {
  return gesture.dx > limit;
}

type IndicatorSpec = { color: string, progress: number };
class IntakeIndicator extends Component {
  state: {
    displayIndicatorIndex: number,
    rightOffset: number,
    leftOffset: number,
  };
  props: { indicators: Array<IndicatorSpec> };
  panResponder: Object;
  constructor() {
    super();
    this.state = {
      displayIndicatorIndex: 1,
      rightOffset: 0,
      leftOffset: 0,
    };
  }
  previousIndicatorExists = () => this.state.displayIndicatorIndex > 0;
  nextIndicatorExists = () => this.state.displayIndicatorIndex < (this.props.indicators.length - 1);
  showPreviousIndicator = () => {
    this.setState({displayIndicatorIndex: this.state.displayIndicatorIndex - 1 });
  };
  showNextIndicator = () => {
    this.setState({displayIndicatorIndex: this.state.displayIndicatorIndex + 1 });
  };
  _clearOffsets() {
    this.setState({leftOffset:0, rightOffset: 0});
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        const { leftOffset, rightOffset } = this.state;
        const step = 8;
        const maxOffset = 300;
        isLeftSwipe(gesture) && leftOffset < maxOffset && this.setState({leftOffset: leftOffset + step});
        isRightSwipe(gesture) && rightOffset < maxOffset && this.setState({rightOffset: rightOffset + step});
      },
      onPanResponderRelease: (e, gesture) => {
        const limit = 50;
        isLeftSwipe(gesture, limit) && this.nextIndicatorExists() && this.showNextIndicator();
        isRightSwipe(gesture, limit) && this.previousIndicatorExists() && this.showPreviousIndicator();
        this._clearOffsets();
      },
    });
  }
  render() {
    const { indicators } = this.props;
    const indicator = indicators[this.state.displayIndicatorIndex];
    const currentIndicator = <IntakeIndicatorCircle color={indicator.color} progress={indicator.progress} />;

    return (
      <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}} {...this.panResponder.panHandlers}>
        <HideableChevronButton displayIf={this.previousIndicatorExists()}
                               width={100}
                               direction="left"
                               onPress={ this.showPreviousIndicator } />
        <View style={{flex: 1, alignItems:'center'}}>
          <View style={{marginLeft: this.state.rightOffset, marginRight: this.state.leftOffset}}>
            {currentIndicator}
          </View>
        </View>
        <HideableChevronButton displayIf={this.nextIndicatorExists()}
                               width={100}
                               direction="right"
                               onPress={ this.showNextIndicator } />
      </View>
    );
  }
}

type HorizontalDirection = 'left' | 'right';

const HideableChevronButton = (props: {
  displayIf: boolean,
  width: number,
  direction: HorizontalDirection,
  onPress: () => void
}) => {
  const { displayIf, width, ...buttonProps } = props;
  return (
    <View style={{width}}>
    { displayIf && <ChevronButton width={width} {...buttonProps}/> }
  </View>
  );
}

const ChevronButton = ({width, direction, onPress}: {width: number, direction: 'left' | 'right', onPress: () => void}) => (
  <TouchableOpacity onPress={ onPress }>
    <Icon name={`chevron-${direction}`} size={width} color={colors.divider} />
  </TouchableOpacity>
);

const NutritientStatuses = ({style}) => (
  <View style={{flexDirection:'row', ...style}}>
    {
      [{name: 'Energi', value: 651, unit: 'kcal', color: colors.redOrange},
       {name: 'Væske', value: 200, unit: 'ml', color: colors.deepBlue},
       {name: 'Protein', value: 20, unit: 'g', color: colors.lightGreen}].map(nutritient =>
         (<View style={{flex: 1, flexDirection: 'column'}} key={nutritient.name}>
           <OrdinaryText style={{textAlign: 'center'}}>{nutritient.name}</OrdinaryText>
           <OrdinaryText style={{textAlign: 'center',
                                 color: nutritient.color,
                                 marginTop: 10,
                                 fontWeight: '700'}}>{`${nutritient.value} ${nutritient.unit}` }</OrdinaryText>
         </View>)
       ) }
  </View>
);

type ConsumedFoodItem = {
  name: string,
  amount: Gram,
  energy: Kcal,
  time: Date,
};

const drawers: Array<{title: string, color: string, items: Array<ConsumedFoodItem>}> = [
  {title: "Frokost, lunsj og kveldsmat",
   color: colors.lightGreen,
   items: [
    {name: "Agurk", amount: 24, energy: 10, time: new Date()},
    {name: "Tomat", amount: 50, energy: 5, time: new Date()},
   ],
  },
  {title: "Mellommåltid",
   color: colors.darkGreen,
   items: [
     {name: "Agurk", amount: 24, energy: 10, time: new Date()},
     {name: "Tomat", amount: 50, energy: 5, time: new Date()},
   ],
  },
  {title: "Middag",
   color: colors.lightBlue,
   items: [
     {name: "Agurk", amount: 24, energy: 10, time: new Date()},
     {name: "Tomat", amount: 50, energy: 5, time: new Date()},
   ],
  },
  {title: "Drikke",
   color: colors.deepBlue,
   items: [
     {name: "Agurk", amount: 24, energy: 10, time: new Date()},
     {name: "Tomat", amount: 50, energy: 5, time: new Date()},
   ],
  },
];

const MealDrawerChest = ({style}) => (
  <View style={style}>
    { drawers.map(drawer =>
      <MealDrawer title={drawer.title} key={drawer.title} items={drawer.items} openColor={drawer.color} />)
    }
  </View>
);

const DrawerHeading = ({open, color, title}: {open: boolean, color: string, title: string}) => (
  <View style={{backgroundColor: open ? color : colors.darkBlue,
                paddingLeft: 20, paddingTop: 10, paddingBottom: 10, paddingRight: 20,
               }}>
    <View style={{flexDirection:'row', alignItems: 'center'}}>
      <Icon name={open ? "expand-more" : "chevron-right" } size={30} color={colors.white} />
      <Text style={{color: colors.white, fontSize: fontSize.small, flex: 1}}>{ title } </Text>
      <AppIcon normal={require('../../img/icon_add.png')}
               pressed={require('../../img/icon_add_active.png')}
               onPress={() => {}}/>
    </View>
  </View>
);


class MealDrawer extends Component {
  props: {title: string, openColor: string, items: Array<ConsumedFoodItem>};
  state: {open: boolean};
  constructor() {
    super();
    this.state = {open: false};
  }
  open = () => { this.setState({open: true}) };
  close = () => { this.setState({open: false}) };
  render() {
    return (
      <TouchableOpacity onPress={ () => this.state.open ? this.close() : this.open() }>
        <View style={{marginBottom: 2, backgroundColor: colors.divider}} >
          <DrawerHeading open={this.state.open} title={this.props.title} color={this.props.openColor} />
          { this.state.open && this.props.items.map(item =>
            <DrawerItem firstLine={`${item.name} (kl. ${formatTime(item.time)})`}
                        secondLine={`${item.amount} g - ${item.energy} kcal`}
                        key={item.name} />) }
        </View>
      </TouchableOpacity>
    );
  }
}

const OrdinaryText = ({children, style}: {children?: string, style?: any}) => (
  <Text style={{fontSize: fontSize.ordinaryText, ...style}}>{ children }</Text>
);

class AppIcon extends Component {
  props: {
    normal: number,
    pressed: number,
    size: number,
    onPress: () => void,
    style?: any,
  };
  state: {isPressed: boolean};
  static defaultProps = {
    size: 40,
  };
  constructor() {
    super();
    this.state = {isPressed: false};
  }
  render() {
    return (
      <TouchableWithoutFeedback onPressIn={() => this.setState({isPressed: true})}
                                onPressOut={() => this.setState({isPressed: false})}
                                onPress={this.props.onPress}
                                >
        <Image source={this.state.isPressed ? this.props.pressed : this.props.normal}
               style={{height: this.props.size, width: this.props.size, ...this.props.style}} />
      </TouchableWithoutFeedback>
    );
  }
}

const DrawerItem = ({firstLine, secondLine}: {firstLine: string, secondLine: string}) => (
  <View style={{paddingLeft: 50, marginBottom: 2,
                paddingTop: 20, paddingBottom: 20, paddingRight: 20,
                backgroundColor: colors.white, flexDirection: 'row'}}>
    <View style={{flex:1}}>
      <OrdinaryText>{ firstLine }</OrdinaryText>
      <OrdinaryText>{ secondLine }</OrdinaryText>
    </View>
    <View style={{flexDirection: 'row'}}>
      <AppIcon style={{marginRight: 15}}
               normal={require('../../img/icon_edit.png')}
               pressed={require('../../img/icon_edit_active.png')}
               onPress={() => {}}/>
      <AppIcon normal={require('../../img/icon_delete.png')}
               pressed={require('../../img/icon_delete_active.png')}
               onPress={() => {}}/>
    </View>
  </View>
);

export default ConnectedPage;
