import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display : 'flex',
        flexDirection : 'column',
        marginTop : 29,
    },
    baseline : {
        backgroundColor : 'gray',
        height : 1
    },
    upperSection : {
        flexDirection: 'column',
        margin :20
    },
    tweetSection :{
        flexDirection :'row',
        padding : 20
    },
    image : {
        flex :1,
        height : 40,
        width : 40,
        borderRadius : 40
    },
    tweetInfo : {
        flex : 8,
        flexDirection : 'column',
        marginLeft : 10,
    },
    tweetName :{
        textTransform:'uppercase',
        fontSize: 15,
        fontWeight: 'bold',
    },
    tweetTime : {
        color: 'gray'
    },
    tweet :{
        marginLeft : 10,
        marginTop : 10,
        fontSize : 18,
        fontWeight : "100",
        color: '#585858'
    },
    actionTab : {
        marginTop : 20,
        padding: 10,
        borderTopWidth:.5,
        borderTopColor : 'gray',
        display : 'flex',
        flexDirection : 'row',
        flex: 1,
        justifyContent: 'space-around',
    },
    commentSection :{
        flex : 9,
        backgroundColor :'gray'
    },
    addComment :{
        padding :15,
        marginLeft :10,
        flexDirection : 'row'
    },
    inputBox :{
        flex : 8,
        borderBottomWidth :1,
        borderBottomColor : 'gray',
    },
    listItem : {
        backgroundColor : 'white',
        margin : 5,
        borderRadius : 4,
        borderColor : 'black',
        borderWidth :1,
        padding : 10,
        flexDirection : 'row'
    },
    commentName : {
        fontWeight :'bold',
        fontSize : 15,
        marginBottom : 8
    },
    comment : {
        color : 'gray',
        marginLeft : 10
    },
    moreComments : {
        alignSelf : 'center' , 
        color : 'white',
        textDecorationLine: 'underline'
    }
})

export default styles