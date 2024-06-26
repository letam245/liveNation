import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Post = ({post: {userId, id, title, body}, index}) => (
  <View style={styles.post}>
    <Text style={styles.postTitle}>{`${index}) ${title}`}</Text>
    <Text style={styles.userIdText}>User ID: {userId}</Text>
    <Text style={styles.postBody}>{body}</Text>
  </View>
);

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
    marginTop: 10,
  },
  postTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  postBody: {
    fontSize: 15,
    paddingVertical: 10,
  },
  userIdText: {
    fontSize: 15,
    paddingVertical: 5,
    textDecorationLine: 'underline'
  },
});

export default Post;
