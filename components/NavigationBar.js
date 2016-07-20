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
import { colors, fontSize } from '../style';
import type { Color } from '../style';

const NavigationBar = ({currentPage, caption, showFrontPage, goBack, color}: {currentPage: string, caption?: string, showFrontPage: () => void, goBack: () => void, color?: Color}) => (
  <View style={{backgroundColor: color || colors.darkBlue, paddingTop: 50, paddingBottom: 30, paddingLeft: 20, paddingRight: 20}}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <Link text="Tilbake" performNavigation={goBack}/>
      </View>
      <View style={{flex: 2}}>
        { caption && <Link text={caption} /> }
      </View>
      <View style={{flex: 1}}>
        <Link text="Til forsiden" performNavigation={showFrontPage} />
      </View>
    </View>
    <Text style={{color: colors.white, textAlign: 'center', fontSize: 35, fontWeight: 'bold', marginTop: 25}}>
      {currentPage}
    </Text>
  </View>
);

const Link = ({performNavigation, text}) => (
  <Text style={{color: colors.white, fontSize: fontSize.small, textAlign: 'center'}} onPress={performNavigation}>
   { text }
  </Text>
);

export default NavigationBar;
