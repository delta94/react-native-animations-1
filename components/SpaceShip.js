import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

export default class AnimateSpaceShip extends Component {
  state = {
    animationY: new Animated.Value(0),
    rotateAnimation: new Animated.Value(0),
    animationX: new Animated.Value(0),
    imageAnimation: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animationY, {
          toValue: -400,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.parallel([
          Animated.timing(this.state.imageAnimation, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true,
          }),

          Animated.timing(this.state.animationX, {
            toValue: 300,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.imageAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),

          Animated.timing(this.state.animationY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.imageAnimation, {
            toValue: 1.5,
            duration: 500,
            useNativeDriver: true,
          }),

          Animated.timing(this.state.animationX, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.imageAnimation, {
            toValue: 2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animationY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
      {iterations: 10},
    ).start();
  };

  render() {
    const rotateInterpolate = this.state.imageAnimation.interpolate({
      inputRange: [0, 2],
      outputRange: ['0deg', '360deg'],
    });
    //
    // const circleInterpolateX = this.state.animationX.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [Math.sin(Math.PI * 0), Math.sin(Math.PI / 2)],
    // });
    //
    // const circleInterpolateY = this.state.animationY.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [-Math.cos(Math.PI * 0), -Math.cos(Math.PI / 2)],
    // });

    const animatedStyles = {
      transform: [
        {
          translateX: this.state.animationX,
        },
        {
          translateY: this.state.animationY,
        },
      ],
    };

    const imageAnimatedStyle = {
      transform: [
        {
          rotate: rotateInterpolate,
        },
      ],
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.view, animatedStyles]}>
            <Animated.Image
              style={imageAnimatedStyle}
              source={require('../assets/ship.png')}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 30,
    width: 30,
    marginLeft: 30,
  },
});
