import config from '../../utils/config'

const INITIAL_STATE = {
    userDetails : {
        userId : {
            value : '',
            errMsg : '',
            placeholder : 'Email/Mobile No.',
            imageURL: require('../../assests/images/getEmailScreen/personLogo.png'),
            style: 'personLogo'
        }
    },
}

const handleChange = (state,setState,key,text) =>{
    setState({
        ...state,
        userDetails : {
            ...state.userDetails,
            [key] : {
                ...state.userDetails[key],
                value : text,
                errMsg : ''
            }
        }
    })
}

const isValidFields = (state, setState) =>{
    let flag=true
    let mailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    let phoneRegex = /^[6-9]\d{9}$/
    let type=2
    if(state.userDetails.userId.value.length==0){
        setState({
            ...state,
            userDetails : {
                ...state.userDetails,
                userId : {
                    ...state.userDetails.userId,
                    errMsg : 'Mandatory!!!'
                }
            }
        })
        flag=false
    }
    else if(!mailRegex.test(state.userDetails.userId.value) && !phoneRegex.test(state.userDetails.userId.value)){
        setState({
            ...state,
            userDetails : {
                ...state.userDetails,
                userId : {
                    ...state.userDetails.userId,
                    errMsg : 'Invalid Entry!!!'
                }
            }
        })
        flag=false
    }

    return flag
}

const submit = async (state, setState ) => {
    if(isValidFields(state, setState)){
        try{
            const response = await fetch(config.url+'/user/email',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email : state.userDetails.userId.value,
                })
            })
            let data = await response.json()
            if(!data.status){
                alert(data.message)
                setState(INITIAL_STATE)
                navigation.navigate("SignUp")
            }
            else{
                navigation.navigate("Password",{
                    data : state.userDetails.userId.value
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

export { INITIAL_STATE, handleChange, submit }