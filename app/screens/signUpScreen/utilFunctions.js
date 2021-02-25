
const INITIAL_STATE = {
    userDetails: {
        fname : {
            value : '',
            errMsg : '',
            placeholder : 'First Name',
        },
        lname : {
            value : '',
            errMsg : '',
            placeholder : 'Last Name',
        },
        email : {
            value : '',
            errMsg : '',
            placeholder : 'Email/Mobile No.',
        },
        password : {
            value : '',
            errMsg : '',
            placeholder : 'Password',
            secureText : true
        }
    }
}

const handleChange = (key,text,state, setState) =>{
    setState(prevState => ({
        ...prevState,
        userDetails : {
            ...prevState.userDetails,
            [key] : {
                ...prevState.userDetails[key],
                value : text,
                errMsg : ''
            }
        }
    }))
}
const isValidFields = (state, setState) =>{
    let flag=true
    let nameRegex=/^[A-Za-z\s ]+$/;
    let mailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    let phoneRegex = /^[6-9]\d{9}$/

    if(state.userDetails.fname.value.length==0){
        setState(prevState => ({
            ...prevState,
            userDetails : {
                ...prevState.userDetails,
                fname : {
                    ...prevState.userDetails.fname,
                    errMsg : "First Name is mandatory!!!"
                }
            }
        }))
        flag=false
    }
    else if(!nameRegex.test(state.userDetails.fname.value)){
        setState(prevState => ({
            ...prevState,
            userDetails : {
                ...prevState.userDetails,
                fname : {
                    ...prevState.userDetails.fname,
                    errMsg : "Must be Alphabatic!!!"
                }
            }
        }))
        flag=false
    }

    if(state.userDetails.lname.value.length==0){
        setState(prevState => ({
            ...prevState,
            userDetails : {
                ...prevState.userDetails,
                lname : {
                    ...prevState.userDetails.lname,
                    errMsg : "Last Name is mandatory!!!"
                }
            }
        }))
        flag=false
    }
    else if(!nameRegex.test(state.userDetails.lname.value)){
        setState(prevState => ({
            ...prevState,
            userDetails : {
                ...prevState.userDetails,
                lname : {
                    ...prevState.userDetails.lname,
                    errMsg : "Must be Alphabatic!!!"
                }
            }
        }))
        flag=false
    }

    if(state.userDetails.password.value.length<6){
        setState(prevState => ({
            ...prevState,
            userDetails : {
                ...prevState.userDetails,
                password : {
                    ...prevState.userDetails.password,
                    errMsg : "Password must be of atleast 6 characters!!!!"
                }
            }
        }))
        flag=false
    }

    if(state.userDetails.email.value.length==0){
        setState(prevState => ({
            ...prevState,
            userDetails : {
                ...prevState.userDetails,
                email : {
                    ...prevState.userDetails.email,
                    errMsg : "Mandatory!!!"
                }
            }
        }))
        flag=false
    }
    else if(!mailRegex.test(state.userDetails.email.value) && !phoneRegex.test(state.userDetails.email.value)){
        setState(prevState => ({
            ...prevState,
            userDetails : {
                ...prevState.userDetails,
                email : {
                    ...prevState.userDetails.email,
                    errMsg : "Invalid Entry!!!"
                }
            }
        }))
        flag=false
    }
    
    return flag 
}

const submit = async (navigation,state, setState) =>{
    if(isValidFields(state, setState)){
        try{
            const response = await fetch(config.url+'/user/signup',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name : state.userDetails.fname.value + ' ' +state.userDetails.lname.value,
                    email : state.userDetails.email.value,
                    password : state.userDetails.password.value,
                })
            })
            const data = await response.json()
            if(data.status){
                alert("User registered!! LogIn Now..")
                setState(INITIAL_STATE)
                navigation.navigate('Email')
            }
            else{
                alert("User Already Exists!!!!")
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

export {
    INITIAL_STATE,
    handleChange,
    submit
}