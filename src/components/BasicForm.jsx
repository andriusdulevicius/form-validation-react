import { useState, useEffect } from 'react';
import useInput from '../hook/useInput';

const BasicForm = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim().length >= 3 && /^[a-zA-Z\s]*$/.test(value));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => {
    const passwordValidationRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    return passwordValidationRegex.test(value);
  });

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
    enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid ? setFormIsValid(true) : setFormIsValid(false);
  }, [enteredNameIsValid, enteredEmailIsValid, enteredPasswordIsValid]);

  const formSubmissionhandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    console.log({ enteredName, enteredEmail, enteredPassword });
  };

  return (
    <form onSubmit={formSubmissionhandler}>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='name'>First Name</label>
          <input onChange={nameChangeHandler} onBlur={nameInputBlurHandler} type='text' id='name' value={enteredName} />
          {nameInputHasError && (
            <p className='error-text'>Name must be at least 3 chars long and can contain only letters and spaces</p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            onChange={passwordChangeHandler}
            onBlur={passwordInputBlurHandler}
            type='password'
            id='password'
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <p className='error-text'>
              Password must be:at least 8 characters, at least 1 numeric character , at least 1 lowercase letter, at
              least 1 uppercase letter, at least 1 special character
            </p>
          )}
        </div>

        <div className='form-control'>
          <label htmlFor='email'>E-mail address</label>
          <input
            onChange={emailChangeHandler}
            onBlur={emailInputBlurHandler}
            type='text'
            id='email'
            value={enteredEmail}
          />
          {emailInputHasError && <p className='error-text'>Enter a valid e-mail</p>}
        </div>
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
