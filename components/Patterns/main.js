import React, {Component} from 'react';
import {
  View,
  StyleSheet,

} from 'react-native';
import Patterns from './patternGame'
import Demo from './demo'

export default class PatternMain extends Component {
  state = {
  
  }

  render() {
    return (
        <View style={styles.container}>
            {/* <Patterns/> */}
            <Demo/>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});