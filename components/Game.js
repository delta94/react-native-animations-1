/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';

export default class Game extends Component {
  state = {
    animationY: new Animated.Value(0),
    animationX: new Animated.Value(0),
    imageAnimation: new Animated.Value(0),
    rotateGridAnimation: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.sequence([
      // Animated.timing(this.state.animationX, {
      //   toValue: 200,
      //   duration: 500,
      //   useNativeDriver: false,
      //   easing: Easing.linear,
      // }),
      Animated.timing(this.state.animationY, {
        toValue: -545,
        duration: 2000,
        useNativeDriver: false,
        easing: Easing.linear,
      }),

      // Animated.timing(this.state.rotateGridAnimation, {
      //   toValue: 0.2,
      //   duration: 500,
      //   useNativeDriver: false,
      //   easing: Easing.linear,
      // }),

      Animated.parallel([
        Animated.timing(this.state.imageAnimation, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.animationY, {
          toValue: -568,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(this.state.animationX, {
          toValue: 50,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(this.state.animationX, {
        toValue: 300,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  showCoordinates = (e) => {
    e.target.measureInWindow((x, y, width, height) => {
      console.log(x, y, width, height, 'its a press event');
    });
  };

  render() {
    const animatedStyles = {
      top: this.state.animationY,
      left: this.state.animationX,
    };
    const rotateInterpolate = this.state.imageAnimation.interpolate({
      inputRange: [0, 2],
      outputRange: ['0deg', '360deg'],
    });
    const imageAnimatedStyle = {
      transform: [
        {
          rotate: rotateInterpolate,
        },
        {scale: 0.5},
      ],
    };

    const rotateGridInterpolate = this.state.rotateGridAnimation.interpolate({
      inputRange: [0, 2],
      outputRange: ['0deg', '360deg'],
    });

    // const rotateGridInterpolateY = this.state.animationY.interpolate({
    //   inputRange: [0, 2],
    //   outputRange: ['0deg', '360deg'],
    // });

    const animatedGridStyles = {
      transform: [
        {
          rotate: rotateGridInterpolate,
        },
      ],
    };

    return (
      <>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback onPress={this.showCoordinates}>
              <Image
                source={require('../assets/pipe2.png')}
                style={styles.curvePipe}
              />
            </TouchableWithoutFeedback>
            <Image
              source={require('../assets/pipe1.png')}
              style={styles.rowPipe}
            />
            <Image
              source={require('../assets/pipe1.png')}
              style={styles.rowPipe}
            />
            <Image
              source={require('../assets/pipe2.png')}
              style={styles.secondCurvePipe}
            />
          </View>
          <Image
            source={require('../assets/pipe1.png')}
            style={styles.columnPipe}
          />
          <Image
            source={require('../assets/pipe1.png')}
            style={styles.columnPipe}
          />
          <Image
            source={require('../assets/pipe1.png')}
            style={styles.columnPipe}
          />
          <TouchableWithoutFeedback onPress={this.showCoordinates}>
            <Image
              source={require('../assets/pipe1.png')}
              style={styles.columnPipe}
            />
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => this.startAnimation(0)}>
          <Animated.View
            style={{...styles.view, ...animatedStyles, ...animatedGridStyles}}>
            <Animated.Image
              source={require('../assets/ship.png')}
              style={{...styles.image, ...imageAnimatedStyle}}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  columnPipe: {
    transform: [{rotate: '270deg'}],
    marginBottom: 10,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'red',
  },
  curvePipe: {
    marginBottom: 10,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'red',
  },
  rowPipe: {
    marginLeft: 10,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'red',
  },
  secondCurvePipe: {
    marginLeft: 10,
    width: 100,
    height: 100,
    transform: [{rotate: '90deg'}],
    borderWidth: 2,
    borderColor: 'red',
  },
  view: {
    marginLeft: 28,
    // width: 50,
    // height: 50,
  },
  image: {
    // width: '100%',
    // height: '100%',
    transform: [{scale: 0.5}],
  },
});
