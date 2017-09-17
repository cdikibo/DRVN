import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput, Image } from 'react-native';
import { Constants, Facebook, Google, MapView, Location, Permissions } from 'expo';

export default class App extends Component {
  state = {
    loginScreen: true,
    phone: "Phone",
    password: "Please enter your password",
    mapScreen:true,
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    taskScreen:true,
    shiftScreen:true,
    finalScreen:true,
  };

  componentDidMount() {
    this._getLocationAsync();
  }

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

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
 };

  _handleButtonPress = () => {
    Alert.alert(
      'You did it!',
    );
  };

  render() {
    return (
      <div>
      <View style={styles.container}>
        {this.state.loginScreen ?
        <div>
        <Text style={styles.paragraph}>
          Disaster Relief Volunteer Network 
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
          //Next Screen
          </div>
        : null}
        
         {this.state.typeScreen ?
          <div>
          //Type Screen
          <Text style={styles.paragraph}>
          Pick Your Volunteer Type  
        </Text>
          </div>
        : null}
        
         {this.state.mapScreen ?
          <div>
          //mapScreen
          
            <MapView
              style={{ alignSelf: 'stretch', height: 200 }}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
            />
            
            <Text>
              Location: {this.state.locationResult}
            </Text>
          
          
          </div>
        : null}
        
         {this.state.taskScreen ?
          <div>
          //Task Screen
          <Text style={styles.paragraph}>
          Pick A Task 
        </Text>
          </div>
        : null}
        
         {this.state.shiftScreen ?
          <div>
          //Shift Screen
          <Text style={styles.paragraph}>
          Pick A Shift 
        </Text>
            <Button
              title="Morning"
              onPress={this._handleButtonPress}
            />
          
            <Button
              title="Day"
              onPress={this._handleButtonPress}
            />
          
            <Button
              title="Night"
              onPress={this._handleButtonPress}
            />
          
          </div>
        : null}
         {this.state.finalScreen ?
          <div>
          //Final Screen
          
            <Image
              source={{ uri: 'https://media.giphy.com/media/8GY3UiUjwKwhO/source.gif' }}
              style={{ height: 140, width: 200 }}
            />
          
          <Text style={styles.paragraph}>
          You are ready to make a difference!
        </Text>
          </div>
        : null}
        
      </View>
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
