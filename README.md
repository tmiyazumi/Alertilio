# Altertilio
ShellHacks 2022 Team members: Brenda Nakasone, Lauren Nunag, Taise Miyazumi

# Introduction
As UF students living in the Gainesville community, we often receive alerts from the University, alerting us about potential dangers around campus. These can be helpful to make students aware about their surroundings; however, due to the large size of campus, it is sometimes difficult to determine what location they are talking about. For instance, certain street names may not be well known and we may not know the names of certain buildings that they text us about. Especially for freshmen, these alerts can be alarming but not helpful because of the lack of familiarity with the surrounding campus. To increase the resourcefulness and capabilities of the UF alerts feature, we created a notification system to enact based on our current location.

Our mobile application utilizes the UF Alert to receive the location of the alerts in the local Gainesville area and locates it on the map. Based on our current location and the location of the incident, we are able to deduce whether the incident occured at a nearby location. If the incident is within 2.5km radius of your current location, the application will send a notification to notify you about this incident and ensure your safety. If you are not in a safe location we will start an audio recording and a call to emergency contact/authorities.

# How to Build
You will need to have node and expo client downloaded.
```
git clone https://github.com/tmiyazumi/Alertilio
cd Alertilio
npm i
npm install --global expo-cli
expo install expo-location
npm i axios
npm i xml2
npm start

```
Link to the Github Repo for the sample Json: https://github.com/tmiyazumi/ufalertjson

Link to the Github Pages: https://tmiyazumi.github.io/ufalertjson/db.json


