import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, StyleSheet, Text, View, Button, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import axios from 'axios';
import { parseString } from 'xml2js';
import * as Notifications from 'expo-notifications';

// const warnings = ["Southwest Recreational Center", 29.6381706, -82.3692468];

//const warnings = ["Shands Hospital", 29.6389, -82.3422];

export default function App() {

  state = {
    data: {'latitude': 'Loading...' }
  }

  getJsonData = () => {
    fetch('https://tmiyazumi.github.io/ufalertjson/db.json', 
    {method: 'GET').then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        data: responseJson
      })
    })
    .catch((err) => {
      console.error(error)
    });
  }

  componentDidMount = () => {
    this.getJsonData()
  }
  
  let [text2, setText] = useState('');
  console.log('start app');

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("Location: ", location.coords.latitude);
      let numCount = 1;
      let locLat = location.coords.latitude;
      let locLon = location.coords.longitude;
      // for (let i = 0; i < location.length; i++){
      //   console.log("location: ", location[i]);
      //   if (numCount == 12 && location[i] != ':' && location[i] != ',' && location[i] != '"'){
      //     console.log("TEXT: ", location[i]);
      //     locLat += location[i];
      //   }
      //   if (numCount == 13 &x& telocationxt[i] != ':' && location[i] != ',' && location[i] != '"'){
      //     locLon += location[i];
      //   }
      //   if (location[i] == '"'){
      //     numCount++;
      //   }
      // }
      console.log("Latitude is: ", locLat);
      console.log("Longitude is: ", locLon);
      console.log("Latitude is: ", warnings[1]);
      console.log("Longitude is: ", warnings[2]);
      let lat2 = warnings[1] - locLat;
      let lon2 = warnings[2] - locLon;
      let p = 0.017453292519943295; // Pi/180
      let c = Math.cos;
      let a = 0.5 - c((warnings[1] - locLat) * p)/2 + c(locLat * p) * c(warnings[1] * p) * (1 - c((warnings[2] - locLon) * p))/2;
      let distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km in km
      let message = "Warning very near your area. Please stay indoors till area is cleared! Location at " + warnings[0] + ".";
      console.log("Distance", distance);
      if (distance <= 2.5){
        Alert.alert(
          'WARNING', 
          'Warning very near your area. Please stay indoors till area is cleared!', 
          [
            {text: 'Help', onPress: () => Alert.alert('Contacting Emergency Contact . . . \nStarting Audio Recording . . .')},
            {text: 'I am Safe', onPress: () => console.log('Yes button clicked'),style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
      } 
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.debug(locLat);
    // console.debug(locLon);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
         {/*text2 ? text2['feed']['$']['xml:base']: ''*/}
      </Text>
      <Text style={styles.title}>              
     {/* <Button title="Fetch" onPress={()=>fetch(setText)} />  */}
      {/*<Text style={styles.paragraph}>{text}</Text> */}
      {"Stay Safe Gators!"}
      </Text>
      <MapView 
        style={{height: '50%', width: '100%', top: 100}}
        provider={PROVIDER_GOOGLE} 
        showsUserLocation={true}
        initialRegion={{
            latitude: 29.6436,
            longitude: -82.3549,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.120,
        }}
      >
      <Marker
        coordinate ={{latitude: warnings[1], longitude: warnings[2]}} //replace hard coded coordinates with variables
        title = {warnings[0]}
        />
        <Circle 
        center={{latitude: warnings[1], longitude: warnings[2]}} //replace hard coded coordinates with variables
        radius={2500}
        strokeColor = '#ff0000'
        fillColor = '#ffcccb'
        />
      </MapView>
      <Image source = {{uri: "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png"}} style={{width: 305, height: 190, top: 130}}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fed8b1',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    top: 80,
    paddingVertical: 8,
    color: '#4467C4',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

