import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { Accelerometer, Barometer, LightSensor, Magnetometer, DeviceMotion, Gyroscope, Pedometer } from 'expo-sensors';

export default function App() {
  const [{ x, y, z }, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [accelerometerSubscription, setAccelerometerSubscription] = useState(null);
  const [accelerometerAvailable, setAccelerometerAvailable] = useState(false);
  const [isAccelerometerSubscribed, setIsAccelerometerSubscribed] = useState(false);

  const [{ pressure, relativeAltitude }, setBarometerData] = useState({ pressure: 0, relativeAltitude: 0 });
  const [barometerSubscription, setBarometerSubscription] = useState(null);
  const [barometerAvailable, setBarometerAvailable] = useState(false);
  const [isBarometerSubscribed, setIsBarometerSubscribed] = useState(false);

  const [{ illuminance }, setLightData] = useState({ illuminance: 0 });
  const [lightSubscription, setLightSubscription] = useState(null);
  const [lightAvailable, setLightAvailable] = useState(false);
  const [isLightSubscribed, setIsLightSubscribed] = useState(false);

  const [{ x: magX, z: magZ }, setMagnetometerData] = useState({ x: 0, z: 0 });
  const [magnetometerSubscription, setMagnetometerSubscription] = useState(null);
  const [magnetometerAvailable, setMagnetometerAvailable] = useState(false);
  const [isMagnetometerSubscribed, setIsMagnetometerSubscribed] = useState(false);

  const [isDeviceMotionSubscribed, setIsDeviceMotionSubscribed] = useState(false);
  const [deviceMotionData, setDeviceMotionData] = useState({});

  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeSubscription, setGyroscopeSubscription] = useState(null);
  const [gyroscopeAvailable, setGyroscopeAvailable] = useState(false);
  const [isGyroscopeSubscribed, setIsGyroscopeSubscribed] = useState(false);

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [pedometerSubscription, setPedometerSubscription] = useState(null);
  const [isPedometerSubscribed, setIsPedometerSubscribed] = useState(false);

  useEffect(() => {
    const checkAccelerometerAvailability = async () => {
      const isAvailable = await Accelerometer.isAvailableAsync();
      setAccelerometerAvailable(isAvailable);
    };

    checkAccelerometerAvailability();

    const checkBarometerAvailability = async () => {
      const isAvailable = await Barometer.isAvailableAsync();
      setBarometerAvailable(isAvailable);
    };

    checkBarometerAvailability();

    const checkLightAvailability = async () => {
      const isAvailable = await LightSensor.isAvailableAsync();
      setLightAvailable(isAvailable);
    };

    checkLightAvailability();

    const checkMagnetometerAvailability = async () => {
      const isAvailable = await Magnetometer.isAvailableAsync();
      setMagnetometerAvailable(isAvailable);
    };

    checkMagnetometerAvailability();

    const checkGyroscopeAvailability = async () => {
      const isAvailable = await Gyroscope.isAvailableAsync();
      setGyroscopeAvailable(isAvailable);
    };

    checkGyroscopeAvailability();

    const checkPedometerAvailability = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));
    };

    checkPedometerAvailability();

    return () => {
      accelerometerSubscription && accelerometerSubscription.remove();
      barometerSubscription && barometerSubscription.remove();
      lightSubscription && lightSubscription.remove();
      magnetometerSubscription && magnetometerSubscription.remove();
      DeviceMotion.removeAllListeners();
      gyroscopeSubscription && gyroscopeSubscription.remove();
      pedometerSubscription && pedometerSubscription.delete();
    };
  }, []);

  const toggleAccelerometerListener = async () => {
    if (accelerometerAvailable) {
      if (!accelerometerSubscription) {
        setAccelerometerSubscription(Accelerometer.addListener(data => {
          setAccelerometerData(data);
        }));
        setIsAccelerometerSubscribed(true);
        Alert.alert("Accelerometer sensor subscribed.");
      } else {
        accelerometerSubscription.remove();
        setAccelerometerSubscription(null);
        setIsAccelerometerSubscribed(false);
      }
    } else {
      Alert.alert("Device doesn't have an accelerometer sensor.");
    }
  };

  const toggleBarometerListener = async () => {
    if (barometerAvailable) {
      if (!barometerSubscription) {
        setBarometerSubscription(Barometer.addListener(data => {
          setBarometerData(data);
        }));
        setIsBarometerSubscribed(true);
        Alert.alert("Barometer sensor subscribed.");
      } else {
        barometerSubscription.remove();
        setBarometerSubscription(null);
        setIsBarometerSubscribed(false);
      }
    } else {
      Alert.alert("Device doesn't have a barometer sensor.");
    }
  };

  const toggleLightListener = async () => {
    if (lightAvailable) {
      if (!lightSubscription) {
        setLightSubscription(LightSensor.addListener(data => {
          setLightData(data);
        }));
        setIsLightSubscribed(true);
        Alert.alert("Light sensor subscribed.");
      } else {
        lightSubscription.remove();
        setLightSubscription(null);
        setIsLightSubscribed(false);
      }
    } else {
      Alert.alert("Device doesn't have a light sensor.");
    }
  };

  const toggleMagnetometerListener = async () => {
    if (magnetometerAvailable) {
      if (!magnetometerSubscription) {
        setMagnetometerSubscription(Magnetometer.addListener(data => {
          setMagnetometerData(data);
        }));
        setIsMagnetometerSubscribed(true);
        Alert.alert("Magnetometer sensor subscribed.");
      } else {
        magnetometerSubscription.remove();
        setMagnetometerSubscription(null);
        setIsMagnetometerSubscribed(false);
      }
    } else {
      Alert.alert("Device doesn't have a magnetometer sensor.");
    }
  };

  const toggleDeviceMotionListener = async () => {
    if (!isDeviceMotionSubscribed) {
      DeviceMotion.addListener(data => {
        setDeviceMotionData(data);
      });
      setIsDeviceMotionSubscribed(true);
      Alert.alert("Device Motion sensor subscribed.");
    } else {
      DeviceMotion.removeAllListeners();
      setIsDeviceMotionSubscribed(false);
      Alert.alert("Device Motion sensor unsubscribed.");
    }
  };

  const toggleGyroscopeListener = async () => {
    if (gyroscopeAvailable) {
      if (!gyroscopeSubscription) {
        setGyroscopeSubscription(Gyroscope.addListener(data => {
          setGyroscopeData(data);
        }));
        setIsGyroscopeSubscribed(true);
        Alert.alert("Gyroscope sensor subscribed.");
      } else {
        gyroscopeSubscription.remove();
        setGyroscopeSubscription(null);
        setIsGyroscopeSubscribed(false);
      }
    } else {
      Alert.alert("Device doesn't have a gyroscope sensor.");
    }
  };

 const subscribePedometer = async () => {
  if (isPedometerAvailable) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);

    const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
    if (pastStepCountResult) {
      setPastStepCount(pastStepCountResult.steps);
    }

    const subscription = Pedometer.watchStepCount(result => {
      setCurrentStepCount(result.steps);
    });

    setPedometerSubscription(subscription); // Store the subscription in state
    setIsPedometerSubscribed(true);
    Alert.alert("Pedometer sensor subscribed.");
  } else {
    Alert.alert("Device doesn't have a pedometer sensor.");
  }
};


 const togglePedometerListener = async () => {
  if (!isPedometerSubscribed) {
    subscribePedometer();
  } else {
    if (pedometerSubscription) {
      pedometerSubscription.delete(); // Remove the subscription
    }
    setPedometerSubscription(null);
    setIsPedometerSubscribed(false);
    Alert.alert("Pedometer sensor unsubscribed.");
  }
};

  return (
    <View style={styles.container}>
    <View styles={styles.cover}>
    <Text>Sensors</Text>
      <View style={styles.sensorContainer}>
        <Text style={styles.heading}styles=
        {{marginTop:20,}}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
        <Text style={styles.text}>x: {x}   y: {y}  z: {z}</Text>
        <TouchableOpacity onPress={toggleAccelerometerListener} style={styles.button}>
          <Text>{isAccelerometerSubscribed ? 'Stop Accelerometer' : 'Start Accelerometer'}</Text>
        </TouchableOpacity>
        {isAccelerometerSubscribed && <Text style={styles.text}>Accelerometer subscribed</Text>}
      </View>
      <View style={styles.sensorContainer}>
        <Text style={styles.heading}>Barometer: Listener {barometerSubscription ? 'ACTIVE' : 'INACTIVE'}</Text>
        <Text style={styles.text}>
          Relative Altitude: {Platform.OS === 'ios' ? ${relativeAltitude} m : Only available on iOS}
        </Text>
        <TouchableOpacity onPress={toggleBarometerListener} style={styles.button}>
          <Text>{isBarometerSubscribed ? 'Stop Barometer' : 'Start Barometer'}</Text>
        </TouchableOpacity>
        {isBarometerSubscribed && <Text style={styles.text}>Barometer subscribed</Text>}
      </View>
      <View style={styles.sensorContainer}>
        <Text style={styles.heading}>Light Sensor:</Text>
        <Text style={styles.text}>
          Illuminance: {Platform.OS === 'android' ? ${illuminance} lx : Only available on Android}
        </Text>
        <TouchableOpacity onPress={toggleLightListener} style={styles.button}>
          <Text>{isLightSubscribed ? 'Stop Light' : 'Start Light'}</Text>
        </TouchableOpacity>
        {isLightSubscribed && <Text style={styles.text}>Light sensor subscribed</Text>}
      </View>
      <View style={styles.sensorContainer}>
        <Text style={styles.heading}>Magnetometer:</Text>
        <Text style={styles.text}>x: {magX}     z: {magZ}</Text>
        <TouchableOpacity onPress={toggleMagnetometerListener} style={styles.button}>
          <Text>{isMagnetometerSubscribed ? 'Stop Magnetometer' : 'Start Magnetometer'}</Text>
        </TouchableOpacity>
        {isMagnetometerSubscribed && <Text style={styles.text}>Magnetometer subscribed</Text>}
      </View>
      <View style={styles.sensorContainer}>
        <Text style={styles.heading}>Device Motion:</Text>
        <TouchableOpacity onPress={toggleDeviceMotionListener} style={styles.button}>
          <Text>{isDeviceMotionSubscribed ? 'Stop Device Motion' : 'Start Device Motion'}</Text>
        </TouchableOpacity>
        {isDeviceMotionSubscribed && (
          <View>
            <Text style={styles.text}>Device Motion sensor subscribed</Text>
            <Text style={styles.text}>Acceleration: {JSON.stringify(deviceMotionData.acceleration)}</Text>
            <Text style={styles.text}>Acceleration Including Gravity: {JSON.stringify(deviceMotionData.accelerationIncludingGravity)}</Text>
            <Text style={styles.text}>Rotation: {JSON.stringify(deviceMotionData.rotation)}</Text>
            <Text style={styles.text}>Orientation: {JSON.stringify(deviceMotionData.orientation)}</Text>
          </View>
        )}
      </View>
      <View style={styles.sensorContainer}>
        <Text style={styles.heading}>Gyroscope:</Text>
        <Text style={styles.text}>x: {gyroscopeData.x}  y: {gyroscopeData.y}  z: {gyroscopeData.z}</Text>
        
        <TouchableOpacity onPress={toggleGyroscopeListener} style={styles.button}>
          <Text>{isGyroscopeSubscribed ? 'Stop Gyroscope' : 'Start Gyroscope'}</Text>
        </TouchableOpacity>
        {isGyroscopeSubscribed && <Text style={styles.text}>Gyroscope subscribed</Text>}
      </View>
      <View style={styles.sensorContainer}>
        <Text style={styles.heading}>Pedometer:</Text>
        <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
        <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
        <Text>Walk! And watch this go up: {currentStepCount}</Text>
        <TouchableOpacity onPress={togglePedometerListener} style={styles.button}>
          <Text>{isPedometerSubscribed ? 'Stop Pedometer' : 'Start Pedometer'}</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d2d2d6',
    
  },
   sensorContainer: {
    marginBottom: 5,
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontStyle:"normal",
  },
   heading: {
    textAlign: 'center',
    fontStyle:"normal",
    fontWeight:"bold",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius:20,
    

  },
  cover:{
    fontWeight:"normal",
    height:90,
    width:90,
    marginTop:20,
    marginBottom:10,
    padding:20,

  }
});