import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function App() {
  const buttons = ['AC', 8, 9, '*', 7, 5, 6, '-', 4, 2, 3, '+', 1, '.', 'DEL', '=', '0', '/'];

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
      <Grid>
        <Col style={{ width: 294.5 }}>
        { buttons.map((button, index) => 
          (button === 'AC') ? 
          <Row key={index} style={[styles.button, {backgroundColor: "#DADADA"}]} onPress={() => handleInput(button)}>
            <Text style={styles.textAC}>{ button }</Text>
          </Row>
          :
          <Row></Row>
        )
        }
        </Col>
        <Col>
        { buttons.map((button, index) => 
          (button === '/') ? 
          <Row key={index} style={[styles.button, {backgroundColor: "#DADADA"}]} onPress={() => handleInput(button)}>
            <Text style={styles.text}>{ button }</Text>
          </Row>
          :
          <Row></Row>
        )
        }
        </Col>
      </Grid >
      <Grid style={{ marginTop: 90 }}>
        <Col>
          { buttons.map((button, index) => 
            (button === 7 || button === 4 || button === 1 || button === '0') ? 
            <Row key={index} style={[styles.button, {backgroundColor: (typeof(button) === "number" || button === '0') ? "#fff" : "#DADADA"}]} onPress={() => handleInput(button)}>
              <Text style={styles.text}>{ button }</Text>
            </Row>
            :
            <Row></Row>
          )
          }
        </Col>
        <Col>
          { buttons.map((button, index) => 
            (button === 8 || button === 5 || button === 2) ? 
            <Row key={index} style={[styles.button, {backgroundColor: (typeof(button) === "number" || button === '0') ? "#fff" : "#DADADA"}]} onPress={() => handleInput(button)}>
              <Text style={styles.text}>{ button }</Text>
            </Row>
            : button === '.' ? 
            <Row key={index} style={[styles.button, {backgroundColor: "#DADADA"}]} onPress={() => handleInput(button)}>
              <Text style={styles.text}>{ button }</Text>
            </Row>
            :
            <Row></Row>
          )
          }
        </Col>
        <Col>
          { buttons.map((button, index) => 
            (button === 9 || button === 6 || button === 3) ? 
            <Row key={index} style={[styles.button, {backgroundColor: (typeof(button) === "number" || button === '0') ? "#fff" : "#DADADA"}]} onPress={() => handleInput(button)}>
              <Text style={styles.text}>{ button }</Text>
            </Row>
            : button === 'DEL' ?
            <Row key={index} style={[styles.button, {backgroundColor: "#DADADA"}]} onPress={() => handleInput(button)}>
              <Text style={styles.text}>{ button }</Text>
            </Row>
            :
            <Row></Row>
          )
          }
        </Col>
        <Col>
          { buttons.map((button, index) => 
            (button === '*' || button === '-' || button === '+') ? 
            <Row key={index} style={[styles.button, {backgroundColor: "#DADADA"}]} onPress={() => handleInput(button)}>
              <Text style={styles.text}>{ button }</Text>
            </Row>
            : button === '=' ?
            <Row key={index} style={[styles.button, {backgroundColor: "#FF9100"}]} onPress={() => handleInput('=')}>
              <Text style={styles.text}>{ button }</Text>
            </Row>
            :
            <Row></Row>
          )
          }
        </Col>
      </Grid>
    </View>
  );
}