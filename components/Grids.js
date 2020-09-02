/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Image,
} from 'react-native';

export default class Grid extends Component {
  state = {
    array: ['1', '2', '3', '4', '5'],
    secondArray: ['6', '7', '8', '9', '10'],
    animationY: new Animated.Value(0),
    animationX: new Animated.Value(0),
    // animation: new Animated.Value(0),
  };

  // onPress={() =>
  //   this.grid.current.measure(
  //     (x, y, width, height, pageX, pageY) => {
  //       console.log(x, y, width, height, pageX, pageY);
  //     },
  grid1 = React.createRef();
  grid2 = React.createRef();
  grid3 = React.createRef();
  grid4 = React.createRef();
  grid5 = React.createRef();
  grid = [this.grid1, this.grid2, this.grid3, this.grid4, this.grid5];

  secondGrid6 = React.createRef();
  secondGrid7 = React.createRef();
  secondGrid8 = React.createRef();
  secondGrid9 = React.createRef();
  secondGrid10 = React.createRef();
  secondGrid = [
    this.secondGrid6,
    this.secondGrid7,
    this.secondGrid8,
    this.secondGrid9,
    this.secondGrid10,
  ];

  // startAnimation = () => {
  //   Animated.loop(
  //     // Animated.sequence([
  //     Animated.timing(this.state.animation, {
  //       toValue: 200,
  //       duration: 1500,
  //       // useNativeDriver: 'true',
  //     }),
  //     // ]),
  //     {iterations: 10},
  //   ).start();
  // };
  getValueX = (x) => {
    console.log(x, 'its x');
    return x;
  };
  getValueY = (y) => {
    console.log(y, 'its y');
    return y;
  };

  startAnimation = () => {
    var allGrids = [...this.grid, ...this.secondGrid];
    // console.log(allGrids, 'all grids');
    // for(let i=0 ; i < allGrids.length; i++)
    var i = 0;

    const setTimeoutFunction = (i, allGrids) => {
      setTimeout(() => {
        console.log(i, 'i from setTimeout');
        allGrids[i].current.measureInWindow((x, y, width, height) => {
          // console.log(x, y, g, 'from nstart anoimation');
          // }
          Animated.sequence([
            Animated.timing(this.state.animationX, {
              toValue: this.getValueX(x),
              duration: 500,
              useNativeDriver: false,
            }),
            Animated.timing(this.state.animationY, {
              toValue: this.getValueY(y),
              duration: 500,
              useNativeDriver: false,
            }),
          ]).start();
        });
        i = i + 1;
        i < 10 ? setTimeoutFunction(i, allGrids) : '';
      }, 1500);
    };

    setTimeoutFunction(i, allGrids);
    // allGrids.map((g) => {
    //   return g.current.measureInWindow((x, y, width, height) => {
    //     // console.log(x, y, g, 'from nstart anoimation');
    //     // }
    //     Animated.sequence([
    //       Animated.timing(this.state.animationX, {
    //         toValue: this.getValueX(x),
    //         duration: 1500,
    //         useNativeDriver: false,
    //       }),
    //       Animated.timing(this.state.animationY, {
    //         toValue: this.getValueY(y),
    //         duration: 1500,
    //         useNativeDriver: false,
    //       }),
    //     ]).start();
    //   });
    // });
  };

  // viewImage = React.createRef();

  // changePosition = () => {
  //   _view.setNativeProps({measureInWindow: {}});
  // };

  render() {
    console.log(this.grid, 'grid');
    const animatedStyles = {
      top: this.state.animationY,
      left: this.state.animationX,
    };

    return (
      <View style={{borderColor: 'red', borderWidth: 4}}>
        <View style={styles.container}>
          <FlatList
            data={this.state.array}
            renderItem={({item}) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  this['grid' + item].current.measureInWindow(
                    (x, y, width, height) => {
                      console.log(x, y);
                    },
                  )
                }>
                <View
                  style={styles.grid}
                  ref={this.grid.filter((g, i) => i + 1 == item)[0]}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {item}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(i) => i}
          />
        </View>
        <View style={styles.secondView}>
          <FlatList
            data={this.state.secondArray}
            renderItem={({item}) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  this['secondGrid' + item].current.measureInWindow(
                    (x, y, width, height) => {
                      console.log(x, y);
                    },
                  )
                }>
                <View
                  style={styles.grid2}
                  ref={this.secondGrid.filter((g, i) => i + 6 == item)[0]}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {item}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(i) => i}
          />
        </View>

        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={{...styles.view, ...animatedStyles}}>
            <Image
              ref={this.viewImage}
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
    // flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: 50,
    borderColor: 'green',
    borderWidth: 0,
    marginBottom: 80,
    // flex: 1,
  },
  grid: {
    width: 25,
    height: 25,
    backgroundColor: 'black',
    margin: 15,
    borderColor: 'blue',
    borderWidth: 0,
    // flex: 1,
  },
  flat: {
    borderColor: 'yellow',
    borderWidth: 0,
  },
  view: {
    position: 'absolute',
    // top: 0,
    // left: 274.6666564941406,
    // left: 0,
    // backgroundColor: 'grey',
    width: 50,
    height: 80,
  },

  secondView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    // flex: 1,
  },
  grid2: {
    width: 25,
    height: 25,
    backgroundColor: 'black',
    margin: 15,
    borderColor: 'blue',
    borderWidth: 0,
  },
  list: {
    alignItems: 'flex-start',
  },
});

//

//
