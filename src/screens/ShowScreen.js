import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Octicons } from '@expo/vector-icons';  

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id')
  );

  return (
    <View> 
      <Text style={styles.content}>{blogPost.title}</Text>
      <Text style={styles.content}>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={ () => 
          navigation.navigate('Edit', { id: navigation.getParam('id') })
        }
      >
        <Octicons style={styles.pencil} name="pencil" size={20} color="black" />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    marginBottom: 5
  },
  pencil: {
    marginRight: 20,
  }
})

export default ShowScreen;