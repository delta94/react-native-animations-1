

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import { pattern_config, getImageSource } from './config';
import * as Animatable from 'react-native-animatable';
import Tooltip from 'react-native-walkthrough-tooltip';

export default class Demo extends Component {
    state = {
        grids: [],
        count: 0,
        countClicks: 0,
        countScore: 0,
        configPatternIndex: Math.floor(Math.random() * pattern_config.length),
        tootipIndex: 0,
        randompattern:[]
    };

    componentDidMount() {
        var randompattern = [];

        while (
            randompattern.length <
            pattern_config[this.state.configPatternIndex].numberOfPatterns
        ) {
            let r = Math.floor(
                Math.random() *
                pattern_config[this.state.configPatternIndex].numberOfGrids,
            );
            if (randompattern.indexOf(r) === -1) {
                randompattern.push(r);
            }
        }
        this.setState({randompattern:randompattern})
        var grids = Array(
            pattern_config[this.state.configPatternIndex].numberOfGrids,
        )
            .fill()
            .map((n, i) => {
                if( randompattern.filter((ele) => ele == i && randompattern[0]== ele).length > 0){
                    this.setState({tootipIndex:0})
                     return {
                        grid: i + 1,
                        isShow: false,
                        isPattern: true,
                        showCross: false,
                        toolTip:true
                    }
                }
                if( randompattern.filter((ele) => ele == i).length > 0){
                    return {
                       grid: i + 1,
                       isShow: false,
                       isPattern: true,
                       showCross: false,
                       toolTip:false
                   }
               }else{
                return {
                    grid: i + 1,
                    isShow: false,
                    isPattern: false,
                    showCross: false,
                    toolTip:false
                }
               }
            });


        this.setState({ grids: grids });

        const setTimeoutFunction = () => {
            setTimeout(
                () => {
                    grids.map((grid, index) => {
                        if (grid.isPattern) {
                            grids[index].isShow = grids[index].isShow ? false : true;
                        }
                    });
                    this.setState({ grids: grids, count: this.state.count + 1 });
                    this.state.count < 2 ? setTimeoutFunction() : null;
                },
                this.state.count == 0 ? 700 : 2000,
            );
        };
        setTimeoutFunction();
    }

    checkPatternCard = ( indexOfgrid) => {
        let grids = this.state.grids,
            countScore = this.state.countScore
        if (this.state.countClicks < grids.filter(grid_ => grid_.isPattern == true).length) {
            grids.map((grid_, i) => {
                if (indexOfgrid == i && grid_.isPattern) {
                    grid_.isShow = true;
                    countScore = countScore + 100
                }
                if (indexOfgrid == i && !grid_.isPattern) {
                    this.bounce
                    grid_.showCross = true;
                    countScore = countScore - 100
                }
                this.setState({ grids: grids, countClicks: this.state.countClicks + 1, countScore: countScore });

            })
        }
    };

    getanOtherToolTop=(id)=>{
        let grids = this.state.grids
        grids[id].toolTip = false
        console.log(id,this.state.tootipIndex+1,this.state.randompattern[this.state.tootipIndex+1])

        this.state.randompattern.length > this.state.tootipIndex+1? grids[this.state.randompattern[this.state.tootipIndex+1]].toolTip = true:null
        this.checkPatternCard(id)
        this.state.randompattern.length > this.state.tootipIndex+1? this.setState({grids:grids,tootipIndex:this.state.tootipIndex+1}):this.props.upDateState('isDemoFinish',true)
    }
   
    bounce = () =>
        this.view
            .bounce(800)
            .then((endState) =>
                console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'),
            );

    render() {
        
        return (
            <>
                <View style={styles.containerOfScore}>
                    <View style={styles.scoreBox} ><Text style={{fontSize:22,fontWeight:'bold',color:'#625e5e'}}> Score</Text><Text style={{fontSize:22,fontWeight:'bold',color:'#625e5e'}}>{this.state.countScore}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                    <View style={{ ...styles.gridStyle }}>
                        {this.state.grids.map((g, id) => (
                            <TouchableWithoutFeedback
                                key={g.grid}
                                onPress={() => {
                                    this.state.count == 2 ? this.checkPatternCard( id) : null;
                                }}>
                                <Tooltip
                                    isVisible={g.toolTip}
                                    content={<Text>Check this out!</Text>}
                                    placement="top"
                                    onClose={() =>this.getanOtherToolTop(id)}
                                >
                                    <TouchableHighlight style={styles.touchable}>
                                        <Animatable.View
                                            animation="bounceIn"
                                            duration={500}
                                            easing="linear">
                                            {!g.isShow && !g.showCross ? (
                                                <View
                                                    style={{
                                                        ...styles.boxStyle,
                                                        backgroundColor:
                                                            pattern_config[this.state.configPatternIndex]
                                                                .gridColor,
                                                    }}
                                                />
                                            ) : null}
                                            {g.isPattern && g.isShow && !g.showCross ? (
                                                <View style={styles.boxStyle}>
                                                    <Animatable.Image
                                                        animation={{
                                                            from: {
                                                                rotateY: this.props.tileVisibility
                                                                    ? '180deg'
                                                                    : '0deg',
                                                            },
                                                            to: {
                                                                rotateY: this.props.tileVisibility
                                                                    ? '0deg'
                                                                    : '180deg',
                                                            },
                                                        }}
                                                        style={styles.pattern}
                                                        source={getImageSource(this.state.configPatternIndex)}
                                                    />
                                                </View>
                                            ) : null}
                                            {g.showCross ? (
                                                <Animatable.View
                                                    animation="bounceIn"
                                                    duration={500}
                                                    easing="bounce"
                                                    style={{
                                                        ...styles.boxStyle,
                                                        backgroundColor:
                                                            pattern_config[this.state.configPatternIndex]
                                                                .gridColor,
                                                    }}>
                                                    <Text style={styles.crossStyle}>X</Text>
                                                </Animatable.View>
                                            ) : null}
                                        </Animatable.View>
                                    </TouchableHighlight>
                                </Tooltip>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerOfScore: { alignItems: 'flex-end' },
    text: {
        fontSize: 50,
    },
    scoreBox: {
        backgroundColor: "#bfbbb7d1",
        width: 120,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },

    pattern: {
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
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 1,
    },
});