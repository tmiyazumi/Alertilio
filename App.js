import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, StyleSheet, Text, View, Button, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
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
    
      //  if ((distance1 < 0.009) && (distance2 < 0.009)){
      
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
      <Text style={styles.title}>
      {/* <Button title="Fetch" onPress={()=>fetch(setText)} />  */}
      {/* <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.paragraph}>locLat</Text> */}
      {"Stay Safe Gators!"}
      </Text>
      <MapView 
        style={{height: '50%', width: '100%', top: 100}}
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
        coordinate ={{latitude: 29.6332, longitude: -82.377}} //replace hard coded coordinates with variables
        />
        <Circle 
        center={{latitude: 29.6332, longitude: -82.377}} //replace hard coded coordinates with variables
        radius={1000}
        />
        </MapView>
        <Image source = {{uri: "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png"}} style={{width: 305, height: 190, top: 130}}></Image> 
    </View>
    //for the gator logo
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fed8b1',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: { //for the stay safe gators title
    top: 80,
    paddingVertical: 8,
    color: '#4467C4',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

