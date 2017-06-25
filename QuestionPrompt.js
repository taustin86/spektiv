'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  question: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  answerInput: {
    height: 60,
    padding: 4,
    margin: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  submission: {
    alignItems: 'center'
  },
  button: {
    height: 36,
    width: 100,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class QuestionPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerString: ''
    };
  }

  onAnswerTextChanged(event) {
    this.setState({ answerString: event.nativeEvent.text });
  }

  onSubmitPressed() {
    console.log("You answered: " + this.state.answerString);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>Given a choice of anyone in the world, whom would you want as a dinner guest?</Text>
        <TextInput style={styles.answerInput} value={this.state.answerString} multiline={true}
          onChange={this.onAnswerTextChanged.bind(this)} />
        <View style={styles.submission}>
          <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
            <Text style={styles.buttonText} onPress={this.onSubmitPressed.bind(this)}>Enter</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = QuestionPrompt;
