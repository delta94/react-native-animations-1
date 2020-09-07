import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AnimateSpaceShip from './components/AnimateSpaceShip';
import SpaceShip from './components/SpaceShip';
import Grids from './components/Grids';
import TryPan from './components/experimentPan';
import Game from './components/Game';
import AdvanceCarousel from './components/AdvanceCarousel';
import Patterns from './components/Patterns/Patterns';

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Patterns />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column-reverse',
    flex: 1,
    borderColor: 'red',
    borderWidth: 0,
    // position: 'relative',
  },
});

export default App;
