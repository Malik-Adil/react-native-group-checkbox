/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,

  Text,

  View,
} from 'react-native';

import GroupCheckBox from 'rn-group-checkbox';
const App = () => {


  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Custom Group Checkbox</Text>
          <GroupCheckBox onClick={(value) => {
            console.log(value)
          }} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default App;
