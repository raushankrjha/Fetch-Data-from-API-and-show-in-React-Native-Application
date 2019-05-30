import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,StyleSheet  } from 'react-native';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://api.github.com/users')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

//item seprator
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }

  render(){


    return(
      <View style={{flex: 1, paddingTop:50,backgroundColor:'white'}}>
      
      <Text style={{fontSize:20,fontStyle:"bold",color:"red",fontWeight: 'bold',margin:5}}>Fetch Data From URL And Show In List</Text>
      
        <FlatList
          data={this.state.dataSource}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) => 
         <View style={{flex:1, flexDirection: 'column'}}>
    
              <Image source = {{ uri: item.avatar_url}} style={styles.imageView} />
            
            <Text style={styles.text}>{item.login}                </Text>
 
            </View>
        
          }
          keyExtractor={({id}, index) => id}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
 
imageView: {
 
    width: '95%',
    height: 200 ,
    margin: 7,
    borderRadius : 5
 
},
text:
{ 
   fontSize: 17,
    color:'black',
    textAlign:'center',
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    
}
 
 
});