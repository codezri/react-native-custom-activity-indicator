import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  Easing,
} from 'react-native';

async function getItems() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return ['Apple', 'Banana', 'Orange', 'Pineapple', 'Mango', 'Kiwi'];
}

function Item({ name }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{name}</Text>
    </View>
  );
}

function CustomActivityIndicator() {
  const lowestScale = 0.4;
  const scaleAnim = useRef(new Animated.Value(lowestScale)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          scaleAnim,
          {
            toValue: 1,
            duration: 800,
            easing: Easing.elastic(),
            useNativeDriver: true
          }
        ),
          Animated.timing(
          scaleAnim,
          {
            toValue: lowestScale,
            duration: 800,
            easing: Easing.back(),
            useNativeDriver: true
          }
        )
      ])
    ).start();
  }, [scaleAnim])

  return (
    <View style={styles.indicatorBox}>
      <Animated.View
        style={{...styles.indicator, scaleX: scaleAnim, scaleY: scaleAnim}}>
      </Animated.View>
    </View>
  );
}

function LoadingAnimationModal() {
  return (
    <Modal transparent={true}>
      <View style={styles.indicatorWrapper}>
        <CustomActivityIndicator/>
        <Text style={styles.indicatorText}>Loading fruits...</Text>
      </View>
    </Modal>
  );
}

function App() {
  const [items, setItems] = useState(['Pineapple', 'Mango', 'Kiwi']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems().then((items) => {
      setItems(items);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => (
    <Item name={item}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
      />
      { loading ? <LoadingAnimationModal/> : null }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#888',
    padding: 12,
    marginBottom: 12,
    marginLeft: 8,
    marginRight: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 24,
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
  },
  indicatorBox: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    width: 70,
    height: 70,
    borderRadius: 100
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
  },
});

export default App;
