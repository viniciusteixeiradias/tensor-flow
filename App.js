import { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const camera = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    requestPermission();
  }

  const takePhoto = async () => {
    const photo = await camera.current.takePictureAsync();
    console.log("Photo Taken", photo);
  }

  const fn = (...args) => {
    console.log("On Picture Saved", args);
  }

  return (
    <View style={styles.container}>
      <Camera ref={camera} style={styles.camera} type={type} photo={true} onPictureSaved={fn} />
      <View>
        <TouchableOpacity 
          onPress={takePhoto} 
          style={{ position: "absolute", bottom: 40, right: 165, height: 80, width: 80, borderRadius: 50, backgroundColor: "lightblue" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    height: "100%",
    width: "100%",
  },
});
