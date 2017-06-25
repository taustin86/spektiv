'use strict';

var React = require('react');
var ReactNative = require('react-native');
var QuestionPrompt = require('./QuestionPrompt');

var styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});

class SpektivApp extends React.Component {
  render() {
    return (
      <QuestionPrompt style={styles.container} />
    );
  }
}

ReactNative.AppRegistry.registerComponent('spektiv', function() { return SpektivApp });
