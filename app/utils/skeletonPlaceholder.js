import React from "react";
import { View, StyleSheet,Image } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const skeletonPlaceholder = () => {
    let arr = [1,2,3,4,5];
    return (
        <SkeletonPlaceholder backgroundColor = 'black'>
            {
                arr.map(item => {
                    return (
                        <View style={styles.listItem} key={item}>
                            <View style = {styles.image} />
                            <View style = {styles.userInfo}>
                                <View style = {styles.userName} />
                                <View style={styles.time} />
                                <View style={styles.tweet} />
                                <View style={styles.actionTab} />
                            </View>
                        </View>
                    )
                })
            }
        </SkeletonPlaceholder>
    );
};

const styles = StyleSheet.create({
    listItem : {
        flexDirection : 'row',
        padding : 5,
        borderWidth : 1,
        borderColor : 'black',
        margin : 10,
        shadowRadius: 2,
        borderRadius : 10,
    },
    image : {
        height : 50,
        width : 50,
        borderRadius : 40,
    },
    userInfo : {
        flex : 9,
        flexDirection : 'column',
        marginLeft : 10,
    },
    userName : {
        width : 80,
        height : 10,
        borderRadius : 8,
    },
    time : {
        width : 200,
        height : 10,
        marginTop : 5,
        borderRadius : 8
    },
    tweet : {
        marginTop : 10,
        marginLeft : 20,
        width : 250,
        height : 50,
        borderRadius : 8
    },
    actionTab : {
        marginTop : 20,
        padding: 10,
        borderRadius : 8
    },
})

export default skeletonPlaceholder
