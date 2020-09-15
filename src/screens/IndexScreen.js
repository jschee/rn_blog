import React, {useContext, useEffect} from 'react'; 
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { Context } from '../context/BlogContext';
import { Octicons } from '@expo/vector-icons';  

const IndexScreen = ({navigation}) => {
  const {state, deleteBlogPost, getBlogPosts} = useContext(Context);

  useEffect(() => {
    getBlogPosts();

    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, [])

  return (
    <View>
      <FlatList 
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={ ({item}) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
              <View style={styles.post}>
                <Text style={styles.title}>{item.title} - {item.id}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Octicons name="trashcan" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Octicons style={styles.plus} name="plus" size={20} color="black" />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  post: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 2,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 18
  },
  plus: {
    marginRight: 20
  }
});

export default IndexScreen;