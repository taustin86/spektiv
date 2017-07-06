'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  conversationContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  respondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 30
  },
  messagesContainer: {
    flex: 5,
    padding: 30,
    marginTop: 45
  },
  promptQuestion: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  skipText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    marginTop: 10,
    textAlign: 'center',
    color: '#656565'
  },
  largeAnswerInput: {
    height: 60,
    padding: 4,
    margin: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  smallAnswerInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  smallAnswerButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
  },
  messageRowUser: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageRowBot: {
    flexDirection: 'row',
  },
  messagesUser: {
    alignSelf: 'flex-end',
    fontSize: 16,
    padding: 17,
    marginTop: 12,
    overflow: 'hidden',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8
  },
  messagesBot: {
    alignSelf: 'flex-start',
    fontSize: 16,
    padding: 17,
    marginTop: 12,
    overflow: 'hidden',
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 8
  }
});

class QuestionPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      suggestedPrompt: 'Given a choice of anyone in the world, whom would you want as a dinner guest?',
      initialResponse: ''
    };
  }

  onSkipQuestion() {
    console.log("[DEBUG] Skip prompted question")
  }

  onInitialResponseChanged(event) {
    this.setState({ initialResponse: event.nativeEvent.text });
  }

  onInitialResponseSubmitted() {
    this.setState({conversation: [{type: 'bot', text: this.state.suggestedPrompt}, {type: 'user', text: this.state.initialResponse}]});
  }

  onConversationResponseChanged(event) {
    this.setState({ conversationResponse: event.nativeEvent.text });
  }

  onSubmitResponse() {
    var conversation = this.state.conversation.slice();
    conversation.push({type: 'user', text: this.state.conversationResponse});
    this.setState({conversation: conversation, conversationResponse: ''});
  }

  render() {
    if(this.state.conversation.length == 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.promptQuestion}>{this.state.suggestedPrompt}</Text>
          <TextInput style={styles.largeAnswerInput} value={this.state.initialResponse} multiline={true}
            onChange={this.onInitialResponseChanged.bind(this)} />
          <View style={styles.submission}>
            <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
              <Text style={styles.buttonText} onPress={this.onInitialResponseSubmitted.bind(this)}>Continue</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.skipText} onPress={this.onSkipQuestion}>skip</Text>
        </View>
      );
    } else {
      var messages = [];
      this.state.conversation.forEach(function(message, index){
        messages.push(<Message key={index} text={message.text} type={message.type}/>);
      });
      return (
        <View style={styles.conversationContainer}>
          <ScrollView ref="conversation" style={styles.messagesContainer}>
            {messages}
          </ScrollView>
          <View style={styles.respondContainer}>
            <TextInput style={styles.smallAnswerInput} multiline={true} value={this.state.conversationResponse}
              onChange={this.onConversationResponseChanged.bind(this)} />
            <TouchableHighlight style={styles.smallAnswerButton} underlayColor='#99d9f4'>
              <Text style={styles.buttonText} onPress={this.onSubmitResponse.bind(this)}>Send</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}

class Message extends Component {
  render() {
    if(this.props.type == 'bot'){
      return (
        <View>
          <View style={styles.messageRowBot}>
            <Text style={styles.messagesBot}>{this.props.text}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.messageRowUser}>
            <Text style={styles.messagesUser}>{this.props.text}</Text>
          </View>
        </View>
      );
    }
  }
}


module.exports = QuestionPrompt;
