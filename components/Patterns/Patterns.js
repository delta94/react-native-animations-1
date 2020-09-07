import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import CardFlip from 'react-native-card-flip';

var grids2 = [
  {grid: 1, show: false},
  {grid: 2, show: false},
  {grid: 3, show: true},
];
export default class Patterns extends Component {
  state = {
    grids: [
      {grid: 1, isShow: false, isPattern: true, showCross: false},
      {grid: 2, isShow: false, isPattern: false, showCross: false},
      {grid: 3, isShow: false, isPattern: false, showCross: false},
    ],
    count: 0,
    gridToHide: null,
    patternList: [],
  };

  componentDidMount() {
    // function shuffle(array) {
    //   array.sort(() => Math.random() - 0.5);
    // }
    // shuffle([true, false])[0];

    // let grids = this.state.grids
    let patternList = this.state.patternList;
    // let randompattern = [];
    // randompattern = Array(2)
    //   .fill()
    //   .map((i) => {
    //     var num = Math.floor(Math.random() * 4);
    //     if (randompattern.indexOf(num) == -1) {
    //       return num;
    //     }
    //     if (randompattern.indexOf(num) !== -1) {
    //       return num >= 3 && num != 0 ? num - 1 : num + 1;
    //     }
    //   });

    var randompattern = [];

    while (randompattern.length < 2) {
      let r = Math.floor(Math.random() * 4);
      if (randompattern.indexOf(r) === -1) {
        randompattern.push(r);
      }
    }

    console.log(randompattern, 'random pattern');
    var grids = Array(2 * 2)
      .fill()
      .map((n, i) => {
        console.log(randompattern.filter((ele) => ele == i));

        return randompattern.filter((ele) => ele == i).length > 0
          ? {
              grid: i + 1,
              isShow: false,
              isPattern: true,
              showCross: false,
            }
          : {
              grid: i + 1,
              isShow: false,
              isPattern: false,
              showCross: false,
            };
      });

    this.setState({grids: grids});

    const setTimeoutFunction = () => {
      setTimeout(
        () => {
          grids.map((grid, index) => {
            if (grid.isPattern) {
              grids[index].isShow = grids[index].isShow ? false : true;
              patternList.push(index);
            }
          });
          console.log(grids, this.state.count);
          this.setState({grids: grids, count: this.state.count + 1});
          this.state.count < 2 ? setTimeoutFunction() : null;
          this.state.count == 1 ? this.getRandom() : null;
        },
        this.state.count == 0 ? 700 : 2000,
      );
    };
    setTimeoutFunction();
  }

  getRandom = () => {
    this.setState({
      gridToHide: Math.floor(Math.random() * this.state.patternList.length),
    });
  };
  checkPatternCard = (grid, indexOfgrid) => {
    let grids = this.state.grids;
    if (indexOfgrid != this.state.gridToHide) {
      grids[indexOfgrid].isCross = true;
      this.setState({grids: grids});
    } else {
      grids[indexOfgrid].isShow = true;
      this.setState({grids: grids});
      alert('won');
    }
  };

  // startAnimation = () => {
  //   Animatew\d.
  // }
  // unflip = () => {
  //   this.card2.flip();
  // };
  //
  // flipIt = () => {
  //   this.card2.flip();
  // };
  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.view}>
            <View />
            <View style={styles.gridStyle}>
              {this.state.grids.map((g, id) => (
                <TouchableWithoutFeedback
                  key={g.grid}
                  onPress={() => this.checkPatternCard(g, id)}>
                  <View>
                    {!g.isShow && !g.isCross ? (
                      <View style={styles.boxStyle} />
                    ) : null}
                    {g.isPattern && g.isShow && !g.isCross ? (
                      <View style={styles.boxStyle}>
                        <Image
                          style={styles.pattern}
                          source={require('../../assets/bluePattern.png')}
                        />
                      </View>
                    ) : null}
                    {g.isCross ? (
                      <View style={styles.boxStyle}>
                        <Text style={styles.crossStyle}>X</Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
        </View>
      </>
    );
  }
}

// <Image
//   style={styles.pattern}
//   source={require('../../assets/blue.png')}
// />
// <Image
//   style={styles.pattern}
//   source={require('../../assets/bluePattern.png')}
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    // width: 100,
  },
  text: {
    fontSize: 50,
  },
  pattern: {
    width: 78,
    height: 77,
  },
  cardContainer: {
    width: 78,
    height: 77,
  },
  card: {
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  gridStyle: {
    justifyContent: 'center',
  },

  boxStyle: {
    width: 78,
    height: 78,
    backgroundColor: 'blue',
    margin: 4,
  },
  crossStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textDecorationColor: 'red',
    textShadowColor: 'red',
    textShadowRadius: 2,
    shadowColor: 'red',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.36,
    // shadowRadius: 6.68,

    // elevation: 11,
    textShadowColor: 'red',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 1,
  },
});
//
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   cardContainer: {
//     width: 320,
//     height: 470,
//   },
//   card: {
//     width: 320,
//     height: 470,
//     backgroundColor: '#FE474C',
//     borderRadius: 5,
//     shadowColor: 'rgba(0,0,0,0.5)',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.5,
//   },
//   card1: {
//     backgroundColor: '#FE474C',
//   },
//   card2: {
//     backgroundColor: '#FEB12C',
//   },
//   label: {
//     lineHeight: 470,
//     textAlign: 'center',
//     fontSize: 55,
//     fontFamily: 'System',
//     color: '#ffffff',
//     backgroundColor: 'transparent',
//   },
// });
//
// <CardFlip
//   style={styles.cardContainer}
//   ref={(card) => (this.card2 = card)}>
//   <TouchableOpacity
//     activeOpacity={1}
//     style={styles.card}
//     onPress={() => this.card2.flip()}>
//     <Image
//       style={styles.pattern}
//       source={require('../../assets/blue.png')}
//     />
//   </TouchableOpacity>
//   <TouchableOpacity
//     activeOpacity={1}
//     onPress={() => this.unflip()}
//     style={styles.card}>
//     <Image
//       style={styles.pattern}
//       source={require('../../assets/bluePattern.png')}
//     />
//   </TouchableOpacity>
// </CardFlip>
//
// <Image
//   style={styles.pattern}
//   source={require('../../assets/blue.png')}
// />
// </View>
// <View
// style={{
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   width: 180,
// }}>
// <Image
//   style={styles.pattern}
//   source={require('../../assets/blue.png')}
// />
// <CardFlip
//   style={styles.cardContainer}
//   ref={(card) => (this.card = card)}>
//   <TouchableOpacity
//     style={styles.card}
//     activeOpacity={1}
//     onPress={() => this.card.flip()}>
//     <Image
//       style={styles.pattern}
//       source={require('../../assets/blue.png')}
//     />
//   </TouchableOpacity>
//   <TouchableOpacity
//     activeOpacity={1}
//     onPress={() => this.card.flip()}
//     style={styles.card}>
//     <Image
//       style={styles.pattern}
//       source={require('../../assets/bluePattern.png')}
//     />
//   </TouchableOpacity>
// </CardFlip>

// style={{
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   width: 180,
//   height: 100,
// }}
