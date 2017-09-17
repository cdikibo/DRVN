import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput, LinearGradient } from 'react-native';
import { Constants, Facebook, Google } from 'expo';

export default class App extends Component {
  state = {
    loginScreen: true,
    phone: "Phone",
    password: "Please enter your password"
  };

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {
          Alert.alert(
            'Logged in!',
            `Hi ${user.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  _handlePhoneChange = phone => {
    this.setState({ phone });
  };
  
  _handlePasswordChange = password => {
    this.setState({ password });
  };

  render() {
    return (
      <div>
      <View style={styles.container}>
        {this.state.loginScreen ?
        <div>
        <Text style={styles.paragraph}>
          Global Disaster Relief Volunteer Network 
        </Text>
        
        <TextInput
          value={this.state.phone}
          onChangeText={this._handlePhoneChange}
          style={{ width: 200, height: 44, padding: 8 }}
        />
      
        <TextInput
          value={this.state.password}
          onChangeText={this._handlePasswordChange}
          style={{ width: 200, height: 44, padding: 8 }}
        />
       <Text style={styles.paragraph}>
          Forgot your password?
        </Text>
        
        <Button
          title="Login with Facebook"
          onPress={this._handleFacebookLogin}
          style={{paddingBottom: 15 }}
        />
      <Text style={styles.OR}>
          OR 
        </Text>
      
        <Button
          title="Login with Google"
          onPress={this._handleGoogleLogin}
          style={styles.buttonlayout}
        />
        </div>
       : null}
       {this.state.nextScreen ?
          <div>
          Next Screen
          </div>
        : null}
        
      </View>
      <LinearGradient
        colors={['#9c44f9', '#726ef8', '#4fcef9']}
        style={{ height: 48, width: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
      >
        <Text style={{ color: '#fff', backgroundColor: 'transparent' }}>
          Cool!
        </Text>
      </LinearGradient>
      </div>
    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
    
  },
  buttonlayout: {
    padding: 10,
  },
});
