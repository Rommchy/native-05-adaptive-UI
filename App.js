import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TextInput,
  Pressable,
  useWindowDimensions,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import { useState } from "react";

const ANDROID_BACKGROUND_COLOR = "#FFFFE0";
const IOS_BACKGROUND_COLOR = "#B0E0E6";

export default function App() {
  const [enteredFeedback, setEnteredFeedback] = useState("");
  const [feedbackCollection, setFeedbackCollection] = useState([]);

  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();
  const isLandscape = deviceWidth > deviceHeight;

  const contentWidth = deviceWidth - 32;
  const navWidth = contentWidth * 0.25;

  console.log(`Width:${deviceWidth}, Height:${deviceHeight}`);

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
    <View
      style={[
        styles.appContainer,
        {
          flexDirection: isLandscape ? "row" : "column",
          paddingTop: isLandscape ? 16 : 60,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          isLandscape
            ? [styles.headerLandscape, { width: navWidth }]
            : styles.headerPortrait,
        ]}
      >
        <View style={isLandscape ? styles.menuLandscape : styles.menuPortrait}>
          <Pressable onPress={() => Alert.alert("Go to Home!")}>
            <Text style={styles.headerItem}>Home</Text>
          </Pressable>
          <Pressable onPress={() => Alert.alert("Go to Catalog!")}>
            <Text style={styles.headerItem}>Catalog</Text>
          </Pressable>
          <Pressable onPress={() => Alert.alert("Go to Order!")}>
            <Text style={styles.headerItem}>Order</Text>
          </Pressable>
        </View>
        {isLandscape && (
          <Image
            source={require("./assets/Feedback_Icon.png")}
            style={styles.navImage}
            resizeMode="contain"
          />
        )}
      </View>

      <KeyboardAvoidingView
        style={[
          styles.main,
          isLandscape && { width: contentWidth - navWidth - 12 },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.headerText}>Feedback form</Text>
        <View
          style={[
            styles.inputContainer,
            isLandscape
              ? { flexDirection: "row", alignItems: "flex-start" }
              : { alignItems: "center" },
          ]}
        >
          <TextInput
            editable
            multiline
            numberOfLines={6}
            maxLength={500}
            style={[
              styles.textInput,
              isLandscape
                ? {
                    flex: 1,
                    height: 90,
                  }
                : {
                    width: "100%",
                    height: 150,
                  },
            ]}
            placeholder="Enter your comment"
            onChangeText={feedbackInputHandler}
            value={enteredFeedback}
          />
          <Pressable
            style={[
              styles.button,
              isLandscape
                ? { width: 170, marginTop: 0, marginLeft: 12 }
                : {
                    width: "90%",
                    marginTop: 20,
                  },
            ]}
            onPress={addFeedbacHandler}
          >
            <Text style={styles.buttonText}>Add feedback</Text>
          </Pressable>
        </View>
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        >
          {feedbackCollection.map((feedback) => (
            <Pressable key={feedback}>
              <Text style={styles.feedbackItem}>{feedback}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor:
      Platform.OS === "ios" ? IOS_BACKGROUND_COLOR : ANDROID_BACKGROUND_COLOR,
  },
  header: {
    backgroundColor: "#D8BFD8",
    padding: 8,
    borderWidth: 1,
    borderColor: "green",
  },
  headerPortrait: {
    width: "100%",
  },
  headerLandscape: {
    justifyContent: "space-between",
    marginRight: 12,
  },
  menuPortrait: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuLandscape: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  navImage: {
    width: 70,
    height: 70,
    alignSelf: "center",
  },
  main: {
    flex: 1,
  },
  headerItem: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00008B",
    marginVertical: 4,
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#00008B",
    marginTop: 8,
    marginBottom: 10,
  },
  inputContainer: {
    paddingBottom: 16,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#DDA0DD",
  },
  textInput: {
    borderWidth: 2,
    fontSize: 18,
    padding: 8,
    textAlignVertical: "top",
  },
  button: {
    height: 50,
    borderWidth: 2,
    backgroundColor: "#DDA0DD",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00008B",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  feedbackItem: {
    margin: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#E6E6FA",
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
