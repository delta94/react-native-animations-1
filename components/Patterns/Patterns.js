import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {pattern_config,getImageSource} from './config';


export default class Patterns extends Component {
  state = {
    grids: [
     
    ],
    count: 0,
    countClicks:0,
    configPatternIndex:Math.floor(Math.random() * pattern_config.length)
  };

  componentDidMount() {

    var randompattern = [];

    while (randompattern.length < pattern_config[this.state.configPatternIndex].numberOfPatterns) {
      let r = Math.floor(Math.random() * pattern_config[this.state.configPatternIndex].numberOfGrids);
      if (randompattern.indexOf(r) === -1) {
        randompattern.push(r);
      }
    }
    var grids = Array(pattern_config[this.state.configPatternIndex].numberOfGrids)
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
 
    if(this.state.countClicks < grids.filter(grid_ => grid_.isPattern==true).length){
      grids.map((grid_,i)=>{
        if (indexOfgrid ==i && grid_.isPattern) {
          grid_.isShow = true;

        } 
        if(indexOfgrid ==i && !grid_.isPattern) {
          grid_.showCross = true;
          
        }
        this.setState({grids: grids,countClicks:this.state.countClicks+1});

      })
    }
  };




  render() {
    dynamicColor=this.state.configPatternIndex
    console.log(dynamicColor)
    console.log('Patterns.render getImageSource() ', getImageSource(this.configPatternIndex))
    return (
      <>
        <View style={styles.container}>
          <View style={styles.view}>
            <View />
            <View style={{...styles.gridStyle}}>
              {this.state.grids.map((g, id) => (
                <TouchableWithoutFeedback
                  key={g.grid}
                  onPress={() => {this.state.count ==2 ?this.checkPatternCard(g, id):null} }>
                  <View>
                    {!g.isShow && !g.showCross ? (
                      <View style={{...styles.boxStyle,backgroundColor: pattern_config[this.state.configPatternIndex].gridColor}} />
                    ) : null}
                    {g.isPattern && g.isShow && !g.showCross ? (
                      <View style={styles.boxStyle}>
                          <Image
                          style={styles.pattern}
                          source={getImageSource(this.state.configPatternIndex)}
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
