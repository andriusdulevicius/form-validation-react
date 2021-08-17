import { useState, useEffect } from 'react';
import useInput from '../hook/useInput';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim().length >= 3 && /^[a-zA-Z\s]*$/.test(value));

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => {
    const emailValidationRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailValidationRegex.test(value);
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    enteredNameIsValid && enteredEmailIsValid ? setFormIsValid(true) : setFormIsValid(false);
  }, [enteredNameIsValid, enteredEmailIsValid]); //use Effect pasikeis tik [] pasikeitus paduotoms value

  const formSubmissionhandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    resetNameInput();
    resetEmailInput();
    console.log({ enteredName, enteredEmail });
  };

  return (
    <form onSubmit={formSubmissionhandler}>
      <div className={'form-control ' + (nameInputHasError && 'invalid')}>
        <label htmlFor='name'>Your Name</label>
        <input onChange={nameChangeHandler} onBlur={nameInputBlurHandler} type='text' id='name' value={enteredName} />
        {nameInputHasError && (
          <p className='error-text'>Name must be at least 3 chars long and can contain only letters and spaces</p>
        )}
      </div>
      <div className={'form-control ' + (emailInputHasError && 'invalid')}>
        <label htmlFor='name'>Your Email</label>
        <input
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          type='text'
          id='email'
          value={enteredEmail}
        />
        {emailInputHasError && <p className='error-text'>Enter a valid email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
