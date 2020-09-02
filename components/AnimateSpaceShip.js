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
    animation: new Animated.Value(0),
    rotateAnimation: new Animated.Value(0),
    animationX: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animation, {
          toValue: -100,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animationX, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),

        // Animated.timing(this.state.rotateAnimation, {
        //   toValue: 180,
        //   duration: 500,
        //   useNativeDriver: true,
        // }),

        // Animated.timing(this.state.rotateAnimation, {
        //   toValue: 0,
        //   duration: 500,
        //   useNativeDriver: true,
        // }),
        //
        Animated.parallel([
          Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),

          Animated.timing(this.state.animationX, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ]),
      {iterations: 10},
    ).start();
    // .start(() =>
    //   Animated.sequence([
    //     this.state.animation.setValue(0),
    //     this.state.rotateAnimation.setValue(0),
    //     this.state.animationX.setValue(0),
    //
    //     // Animated.timing(this.state.rotateAnimation, {
    //     //   toValue: 30,
    //     //   duration: 500,
    //     //   useNativeDriver: true,
    //     // }),
    //     // ]),
    //   ]),
    // );
    // .start(() => alert('Animation completed'));

    // Animated.timing(this.state.animation, {
    //   toValue: -500,
    //   duration: 2500,
    //   useNativeDriver: true,
    // }).start(() => {
    //   this.state.animation.setValue(0);
    //   // Animated.timing(this.state.animation, {
    //   //   toValue: 50,
    //   //   duration: 2500,
    //   //   useNativeDriver: true,
    //   // });
    //   Animated.timing(this.state.rotateAnimation, {
    //     toValue: 360,
    //     duration: 5500,
    //   });
    // });
  };

  render() {
    var range = 1,
      snapshot = 50,
      radius = 100;
    /// translateX
    var inputRangeX = [],
      outputRangeX = [];
    for (var i = 0; i <= snapshot; ++i) {
      var value = i / snapshot;
      var move = Math.sin((value * Math.PI) / 2) * radius;
      inputRangeX.push(value);
      outputRangeX.push(move);
    }
    this.translateX = this.state.animationX.interpolate({
      inputRange: inputRangeX,
      outputRange: outputRangeX,
    });

    const translateXInterpolate = this.translateX;

    /// translateY
    var inputRange = [],
      outputRange = [];
    for (var i = 0; i <= snapshot; ++i) {
      var value = i / snapshot;
      var move = -Math.cos((value * Math.PI) / 2) * radius;
      inputRange.push(value);
      outputRange.push(move);
    }
    this.translateY = this.state.animation.interpolate({
      inputRange: inputRange,
      outputRange: outputRange,
    });
    const translateYInterpolate = this.translateY;

    console.log(this.state, 'this.state');
    const rotateInterpolate = this.state.rotateAnimation.interpolate({
      inputRange: [0, 700],
      outputRange: ['0deg', '360deg'],
    });

    const animatedStyles = {
      transform: [
        {
          translateY: translateYInterpolate,
        },
        {
          translateX: translateXInterpolate,
        },
        {
          rotate: rotateInterpolate,
        },
      ],
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.Image
            source={require('../assets/ship.png')}
            style={[styles.box, animatedStyles]}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {},
});
