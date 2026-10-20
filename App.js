import {StyleSheet, 
        Text, 
        View, 
        ScrollView, 
        Alert,
        TextInput, 
        Pressable} from 'react-native';
import { useState } from 'react';

const ANDROID_BACKGROUND_COLOR = '#FFFFE0'; 
const IOS_BACKGROUND_COLOR = '#B0E0E6'; 

export default function App() {
  const [enteredFeedback, setEnteredFeedback] = useState('');
  const [feedbackCollection, setFeedbackCollection] = useState([]);

  function feedbackInputHandler(enteredText) {
    setEnteredFeedback(enteredText);
  }

  function addFeedbacHandler() {
    if (enteredFeedback.trim() == "") return;
    
    setFeedbackCollection((curFeedbackCollection) => [
      ...curFeedbackCollection,
      enteredFeedback,
    ]);
    setEnteredFeedback("");
  }

  return ( 
    <View style={styles.appContainer}>
      <View style={styles.header}>
        <Pressable onPress={ () => Alert.alert("Go to Home!") } >
            <Text style={styles.headerItem}>Home</Text>
        </Pressable>
        <Pressable onPress={ () => Alert.alert("Go to Catalog!") } >
            <Text style={styles.headerItem}>Catalog</Text>
        </Pressable>
        <Pressable onPress={ () => Alert.alert("Go to Order!") } >
            <Text style={styles.headerItem}>Order</Text>
        </Pressable>
      </View>
      <View style={styles.main}>      
        <Text style={styles.headerText}>Feedback form</Text>
        <View style={styles.inputContainer}>
          <TextInput
              editable
              multiline
              numberOfLines={6}
              maxLength={500}
              style={styles.textInput}
              placeholder="Enter your comment"
              onChangeText={feedbackInputHandler}
              value={enteredFeedback}
          />
          <Pressable 
              style={styles.button} 
              onPress={addFeedbacHandler} >
            <Text style={styles.buttonText}>Add feedback</Text>
          </Pressable>
        </View>
        <ScrollView>    
          {feedbackCollection.map((feedback) =>
            <Pressable key={feedback} >
                <Text style={styles.feedbackItem}>
                  {feedback}
                </Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D8BFD8',
    padding: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',   
  },
  main: {
    height: '95%',
  },
  headerItem: {   
    fontSize: 20,
    fontWeight: 'bold',
    color: "#00008B", 
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: "#00008B",
    marginTop: 15,
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
    paddingBottom: 28,
    marginBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#DDA0DD', 
  },
  textInput: {
    borderWidth: 2,
    width: '90%',
    height: 150,
    fontSize: 18,
    padding: 8,
    textAlignVertical: 'top',
  },
  button: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    marginTop: 20,
    backgroundColor: "#DDA0DD",
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    height: 30,    
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#00008B",
  },
  feedbackItem: {
    margin: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#E6E6FA",
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    borderWidth: 2,  
  },
});
