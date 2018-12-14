const validate = (value,rules,connectedValue)=>{
    let isValid = true;
    for(let rule in rules){
        switch (rule){
            case 'notEmpty':
                isValid = isValid && notEmpty(value);
                break;
            case 'isEmail':
                isValid = isValid && emailValidator(value);
                break;
            case 'minLength':
                isValid = isValid && passwordValidator(value,rules[rule]);
                break;
            case 'equalTo':
                isValid = isValid && confirmPasswordValidator(value,connectedValue[rule]);
                
                break;
            default:
                isValid = true;
        }
    }
    return isValid;
}
const emailValidator = val =>{
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
}
const passwordValidator = (val,miLength)=>{
    return val.length >= miLength;
}
const confirmPasswordValidator = (val,checkVal)=>{
    return val === checkVal;
}
const notEmpty = (value)=>{
    return value.trim() !== '';
}

export default validate;