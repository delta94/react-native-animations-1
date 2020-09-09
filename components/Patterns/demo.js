import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text

} from 'react-native';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";

const WalkthroughableText = walkthroughable(Text);

class Demo extends Component {
    state = {

    }

    render() {
        return (
            <View style={styles.container}>
               <CopilotStep text="Hey! This is the first step of the tour!" order={1} name="openApp">
                <WalkthroughableText style={styles.title}>
                    {'Welcome to the demo of\n"React Native Joyride"'}
                </WalkthroughableText>
                </CopilotStep>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
      },

});

export default copilot()(Demo);
