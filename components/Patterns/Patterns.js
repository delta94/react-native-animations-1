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
     
    ],
    count: 0,
  };

  componentDidMount() {
   

    var randompattern = [];

    while (randompattern.length < 2) {
      let r = Math.floor(Math.random() * 4);
      if (randompattern.indexOf(r) === -1) {
        randompattern.push(r);
      }
    }

    var grids = Array(2 * 2)
      .fill()
      .map((n, i) => {

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
            }
          });
          this.setState({grids: grids, count: this.state.count + 1});
          this.state.count < 2 ? setTimeoutFunction() : null;
        },
        this.state.count == 0 ? 700 : 2000,
      );
    };
    setTimeoutFunction();
  }


  checkPatternCard = (grid, indexOfgrid) => {
    let grids = this.state.grids;
    grids.map((grid_,i)=>{
      if (indexOfgrid ==i && grid.isPattern) {
        grid_.isShow = true;

      } 
      if(indexOfgrid ==i && !grid.isPattern) {
        grid_.showCross = true;
        
      }
      this.setState({grids: grids});

    })
    
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
                    {!g.isShow && !g.showCross ? (
                      <View style={styles.boxStyle} />
                    ) : null}
                    {g.isPattern && g.isShow && !g.showCross ? (
                      <View style={styles.boxStyle}>
                        <Image
                          style={styles.pattern}
                          source={require('../../assets/bluePattern.png')}
                        />
                      </View>
                    ) : null}
                    {g.showCross ? (
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
    flexDirection:'row',
    flexWrap:'wrap'

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
    textShadowColor: 'red',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 1,
  },
});
