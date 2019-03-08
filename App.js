import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession, WebBrowser, Linking } from 'expo';
export default class Login extends React.Component {
  state = {
    authResult: {},
  };

  render() {
    if (this.state.authResult.type === 'success') {
      console.log(this.state.authResult);
    }

    return (
      <View style={styles.container}>
        <Button title="Login with Facebook" onPress={this.handleOAuthLogin} />
      </View>
    );
  }

  handleRedirect = async event => {
    WebBrowser.dismissBrowser();
  };

  handleOAuthLogin = async () => {
    // gets the app's deep link
    let redirectUrl = await Linking.getInitialURL();
    console.log(redirectUrl);
    // this should change depending on where the server is running
    let authUrl = 'your-server-url-here/auth/facebook';

    this.addLinkingListener();

    try {
      let authResult = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUrl
      );

      // we can use local storage to persist this when app is closed
      await this.setState({ authResult });
    } catch (err) {
      console.log('ERROR:', err);
    }

    this.removeLinkingListener();
  };

  addLinkingListener = () => {
    Linking.addEventListener('url', this.handleRedirect);
  };

  removeLinkingListener = () => {
    Linking.removeEventListener('url', this.handleRedirect);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
