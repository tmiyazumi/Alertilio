import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import { parseString } from 'xml2js';
import * as Notifications from 'expo-notifications';

// const url = "https://gist.github.com/tmiyazumi/2e5dbf20618572170fa139f8a02717d1.js";



async function fetch(setText) {
  const response = await axios.get(url);
  console.log('resp data', response.data)
  parseString(response.data, function (err, result) {
   setText(result)
  console.log('console.log', result)
  });        
}

export default function App() {

  const warnings = ["Southwest Recreational Center", 29.6322, -82.337];

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
      let numCount = 1;
      let locLat = "";
      let locLon = "";
      for (let i = 0; i < text.length; i++){
        if (text[i] == '"'){
          numCount++;
        }
        if (numCount == 9){
          locLat += text[i];
        }
        if (numCount == 13){
          locLon += text[i];
        }
      }

      let distance1 = warnings[1] - locLat;
      let distance2 = warnings[2] - locLon;
    
      // if ((distance1 < 0.009) && (distance2 < 0.009)){
      
      let message = "Warning very near your area. Please stay indoors till area is cleared!" + locLat;
      if (locLat != "5"){
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
    //}

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
         {text2 ? text2['feed']['$']['xml:base']: ''}
      </Text>
      <Button title="Fetch" onPress={()=>fetch(setText)} />
      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.paragraph}>locLat</Text>
      <MapView 
        style={{height: '50%', width: '100%'}}
        provider={PROVIDER_GOOGLE} 
        showsUserLocation={true}
        initialRegion={{
            latitude: 29.6332,
            longitude: -82.377,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.120,
        }}
      >
        <Marker
        coordinate ={{latitude: locLat, longitude: locLon}}
        />
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fed8b1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

