import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Post from './Post.jsx';

const URL = 'https://jsonplaceholder.typicode.com/posts';
const PAGE_SIZE = 6;

const Posts = ({filterType}) => {
  const flatListRef = useRef();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [endReached, setEndreached] = useState(false);

  useEffect(() => {
    handleFetch(1);
  }, []);

  useEffect(() => {
    resetState();
    handleFetch(1, filterType);
  }, [filterType]);

  const handleFetch = async (page, filter) => {
    if (loading) return;
    setLoading(true)
    // jsonplaceholder not support _user or query _like not working anymore
    const fetchURL = filter ? `${URL}?_page=${page}&_limit=${PAGE_SIZE}&userId=${filter}` : `${URL}?_page=${page}&_limit=${PAGE_SIZE}`
    try {
      const res = await fetch(fetchURL);
      const data = await res.json();
      setEndreached(data.length < PAGE_SIZE);
      setPosts(page === 1 ? data : [...posts, ...data]);
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setPosts([]);
    setCurrentPage(1);
    setEndreached(false); 
    setLoading(false);
  }

  const renderFooter = () => (
    !loading && !endReached ? <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="black" /> : null
  );

  const handleEndreached = () => {
    if(!loading && !endReached) {
        const nextPage = currentPage + 1;
        handleFetch(nextPage, filterType);
        setCurrentPage(nextPage);
    }
  }


  return (
    <View style={{margin: 20}}>
      <FlatList
        ref={flatListRef}
        style={styles.flatlistContainer}
        testID="posts"
        data={posts}
        keyExtractor={item => `${item.id}`}
        renderItem={({item, index}) => <Post post={item} index={index + 1}/>}
        onEndReached={handleEndreached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    marginBottom: 60, 
  }
});

export default Posts;
