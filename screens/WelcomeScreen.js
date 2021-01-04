import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import BookAnimation from '../components/BookSanta';
import db from '../Config'

export default class WelcomeScreen extends Component{
  constructor(){
    super();
    this.state = {
      email:'',
      password:''
    }
  }

  userLogin = async(email, password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      Alert.alert('Successfully Logged in');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(errorMessage);
    });
  }

  userSignup = async(email, password)=>{
    console.log('SignIn');
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      Alert.alert('User added successfully');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(errorMessage);
    });
  }

  render(){
    return(
      <View style = {styles.container}>
        <View style = {styles.profileContainer}>
          <BookAnimation/>
          <Text style = {styles.title}>Book Santa</Text>
        </View>
        <View style = {styles.buttonContainer}>
          <TextInput
            placeholder = "example@abcd.com"
            placeholderTextColor = 'white'
            style = {styles.loginBox}
            onChangeText = {text=>{
              this.setState({email:text});
            }}
            keyboardType = 'email-address'
          />

          <TextInput
            placeholder = "Enter Password"
            placeholderTextColor = 'white'
            style = {styles.loginBox}
            onChangeText = {text=>{
              this.setState({password:text});
            }}
            secureTextEntry = {true}
          />

          <TouchableOpacity
            style = {[styles.button, {marginBottom:20, marginTop:20}]}
            onPress = {()=>{
              this.userLogin(this.state.email, this.state.password);
            }}>
              <Text style = {styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style = {styles.button}
            onPress = {()=>{
              this.userSignup(this.state.email, this.state.password);
            }}>
              <Text style = {styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})
