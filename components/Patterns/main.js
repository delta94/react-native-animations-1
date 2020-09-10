import React, { Component } from 'react';
import {
    View,
    StyleSheet,

} from 'react-native';
import Patterns from './patternGame'
import Demo from './demo'

export default class PatternMain extends Component {
    state = {
        isDemoFinish: false
    }
    upDateState = (key, value) => {
        this.setState({ [key]: value })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isDemoFinish ?
                    <Patterns /> :
                    <Demo upDateState={this.upDateState}/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});