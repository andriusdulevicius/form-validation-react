import { useState, useEffect } from 'react';
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const enteredNameIsValid = enteredName.trim().length >= 3 && /^[a-zA-Z\s]*$/.test(enteredName);
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
  const emailValidationRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const enteredEmailIsValid = emailValidationRegex.test(enteredEmail);
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched;

  useEffect(() => {
    enteredNameIsValid && enteredEmailIsValid ? setFormIsValid(true) : setFormIsValid(false);
  }, [enteredNameIsValid, enteredEmailIsValid]); //use Effect pasikeis tik [] pasikeitus paduotoms value

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const nameInputBlurHandler = () => {
    setEnteredNameIsTouched(true);
  };
  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const emailInputBlurHandler = () => {
    setEnteredEmailIsTouched(true);
  };

  const formSubmissionhandler = (e) => {
    e.preventDefault();
    //formos siuntimas reiskia , kad visi laukai yra paliesti
    setEnteredNameIsTouched(true);
    setEnteredEmailIsTouched(true);
    if (!formIsValid) return;
    setEnteredName('');
    setEnteredNameIsTouched(false);
    setEnteredEmail('');
    setEnteredEmailIsTouched(false);

    console.log({ enteredName, enteredEmail });
  };

  return (
    <form onSubmit={formSubmissionhandler}>
      <div className={'form-control ' + (nameInputIsInvalid && 'invalid')}>
        <label htmlFor='name'>Your Name</label>
        <input onChange={nameChangeHandler} onBlur={nameInputBlurHandler} type='text' id='name' value={enteredName} />
        {nameInputIsInvalid && (
          <p className='error-text'>Name must be at least 3 chars long and can contain only letters and spaces</p>
        )}
      </div>
      <div className={'form-control ' + (emailInputIsInvalid && 'invalid')}>
        <label htmlFor='name'>Your Email</label>
        <input
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          type='text'
          id='email'
          value={enteredEmail}
        />
        {emailInputIsInvalid && <p className='error-text'>Enter a valid email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
