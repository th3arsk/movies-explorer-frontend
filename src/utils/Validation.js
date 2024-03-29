import React, { useContext } from "react";
import validator from "validator";
import CurrentUserContext from "../contexts/CurrentUserContext";

function useValidation(value, validations) {
    const [ isEmpty, setEmpty ] = React.useState(true);
    const [ minLength, setMinLength ] = React.useState(false);
    const [ message, setMessage ] = React.useState("");
    const [ isEmail, setEmail ] = React.useState(false);
    const [ isValid, setValid ] = React.useState(false);
    const [ isSame, setSame ] = React.useState(false);
    const currentUser = useContext(CurrentUserContext);
    
    React.useEffect(() => {
      for( const validation in validations ) {
        switch( validation ) {
          case 'isEmpty':
            value ? setEmpty(false) : setEmpty(true)
            value ? setMessage("") : setMessage("Это обязательное поле")
            break
          case 'minLength':
            if (value) {
              value.length < validations[validation] ? setMinLength(true) : setMinLength(false)  
              value.length < validations[validation] ? setMessage(`Минимальная длинна поля: ${validations[validation]}`) : setMessage("")
            }
            break
          case 'isEmail':
            if (value) {
              validator.isEmail(value) ? setEmail(false) : setEmail(true) 
              !validator.isEmail(value) ? setMessage("Введите адресс электронной почты") : setMessage("")
            } 
            break
          case 'isSame':
            if (value) {
              value === currentUser.name || value === currentUser.email ? setSame(true) : setSame(false) 
              value === currentUser.name || value === currentUser.email ? setMessage("Введите новые данные") : setMessage("")
            } 
            break
        } 
      }
    }, [value]);

    React.useEffect(()=>{
      if ( isEmpty || isEmail || minLength ) {
        setValid(false);
      } else {
        setValid(true);
      }
    }, [isEmpty, minLength, isEmail])

    return { 
      isEmpty,
      minLength,
      isEmail,
      isSame,
      message,
      isValid
    }
  }

export function useInput(initialValue, validations) {
  const [ value, setValue ] = React.useState(initialValue);
  const [ isDirty, setDirty ] = React.useState(false);
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    setDirty(true);
  }

  return { 
    onChange,
    onBlur,
    value,
    isDirty,
    ...valid
  }
}