import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text } from "react-native";
import Clock from 'react-live-clock';

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [view1, setView] = useState(1);

  const [page1, setPage] = useState(1);

  const getMovies = async () => {
    try {
     const response = await fetch('https://reactnative.dev/movies.json');
     const json = await response.json();
     setData(json.movies);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View>
      <View style={styles.topBar}>
          <button style={styles.button} onClick={() => setPage(1)}>Clock and Counter</button>
          <button style={styles.button} onClick={() => setPage(0)}>Movie Data</button>    
      </View>
      {page1 ? 
        <View style={styles.tabContainer}>
          <View style={styles.clockContainer}>
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
          </View>
          <View style={styles.counterContainer}>
            <p>{count}</p>
            <View style={styles.buttonContainer}>
              <button style={styles.button} onClick={() => setCount(count + step)}>+</button>
              <button style={styles.button} onClick={() => setCount(count - step)}>-</button>
              <button style={styles.button} onClick={() => {setStep(step == 1 ? 2 : 1); setCount(0)}}>Toggle Step Size ({step})</button>
            </View>
          </View>
        </View> :
        <View style={styles.tabContainer}>
          <View style={styles.listContainer}>
            {isLoading ? 
              <ActivityIndicator/> : 
              view1 ?
                <FlatList data={data} renderItem={({ item }) => (<Text>{item.title}, {item.releaseYear}</Text>)}/> :
                <FlatList data={data} renderItem={({ item }) => (<Text>{item.title} ::: {item.releaseYear}</Text>)}/>
            }
          <button style={styles.button} onClick={() => setView(view1 ? 0 : 1)}>Toggle View</button>
          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    backgroundColor: '#25292e',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  clockContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: '100%',
    fontSize: 50,
    borderWidth: 2,
  },
  counterContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: '100%',
    fontSize: '300%', 
    borderWidth: 2,
  },
  buttonContainer: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 5,
    width: '20%',
  },
});
