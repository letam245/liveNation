import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Header from "./Header";
import Posts from './Posts';

const App = () => {
    const [filterType, setFilterType] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.frame}>
                <Header
                    filterType={filterType}
                    setFilterType={setFilterType}
                />
               
                <Posts filterType={filterType}/>
            </View>
        </SafeAreaView>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    frame: {
        flex: 1,
    }
})

