import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const buttons = ['0', '.', 'DEL', '=', 1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 'AC', '/'];

  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const lastNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    switch(operator) {
      case '+': 
        setCurrentNumber((firstNumber + lastNumber).toString());
        return;

      case '-': 
        setCurrentNumber((firstNumber - lastNumber).toString());
        return;

      case '*': 
        setCurrentNumber((firstNumber * lastNumber).toString());
        return;

      case '/': 
        setCurrentNumber((firstNumber / lastNumber).toString());
        return;
    }
  }

  function handleInput(pressedButton) {
    if (pressedButton === '+' || pressedButton === '-' || pressedButton === '*' || pressedButton === '/') {
      setCurrentNumber(currentNumber + " " + pressedButton + " ");
      return;
    }
    switch(pressedButton) {
      case 'DEL': 
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)));
        return;
      
      case 'AC': 
        setLastNumber("");
        setCurrentNumber("");
        return;

      case '=':
        setLastNumber(currentNumber + " = ");
        calculator();
        return;  
    }

    setCurrentNumber(currentNumber + pressedButton);
    return;
  }

  const styles = StyleSheet.create({
    result: {
      backgroundColor: "#f5f5f5",
      width: "100%",
      minHeight: 300,
      alignItems: "flex-end",
      justifyContent: "flex-end"
    },
    textResult: {
      margin: 10,
      fontSize: 40,
      color: "black"
    },

    historicText: {
      color: "#616161",
      marginRight: 10,
      fontSize: 18
    },

    buttons: {
      flexDirection: "row",
      flexWrap: "wrap-reverse",
    },
    button: {
      borderColor: "#e5e5e5",
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 90, 
      minHeight: 90,
      flexGrow: 1,
      flexShrink: 1,
      flexDirection: "row",
    },
    text: {
      color: "black",
      fontSize: 30
    },
    textAC: {
      textAlign: "center",
      width: 284,
      color: "black",
      fontSize: 30
    }
  });

  return (
    <View>
      <View style={styles.result}>
        <Text style={styles.historicText}>{lastNumber}</Text>
        <Text style={styles.textResult}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        { buttons.map((button) => 
          button === '=' ? 
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: "#FF9100"}]} onPress={() => handleInput('=')}>
              <Text style={styles.text}>{ button }</Text>
          </TouchableOpacity> 
          : button === 'AC' ? 
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: "#DADADA"}]} onPress={() => handleInput('AC')}>
              <Text style={styles.textAC}>{ button }</Text>
          </TouchableOpacity>
          
          : 
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: (typeof(button) === "number" || button === '0') ? "#fff" : "#DADADA"}]} onPress={() => handleInput(button)}>
              <Text style={styles.text}>{ button }</Text>
          </TouchableOpacity>
        )
        }
      </View>
    </View>
  );
}
