import React from "react";

function useValidation(value, validations) {
    const [ isEmpty, setEmpty ] = React.useState(true);
    const [ minLength, setMinLength ] = React.useState(false);
    const [ message, setMessage ] = React.useState("");
    const [ isEmail, setEmail ] = React.useState(false);
    const [ isValid, setValid ] = React.useState(false);

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
              const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              regex.test(String(value).toLocaleLowerCase()) ? setEmail(false) : setEmail(true) 
              !regex.test(String(value).toLocaleLowerCase()) ? setMessage("Введите адресс электронной почты") : setMessage("")
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
    console.log(e.target.value)
  }

  return { 
    onChange,
    onBlur,
    value,
    isDirty,
    ...valid
  }
}