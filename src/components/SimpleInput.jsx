import { useState, useEffect } from 'react';
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

  useEffect(() => {
    enteredNameIsValid ? setFormIsValid(true) : setFormIsValid(false);
  }, [enteredNameIsValid]); //use Effect pasikeis tik [] pasikeitus paduotai value

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const formSubmissionhandler = (e) => {
    e.preventDefault();
    //formos siuntimas reiskia , kad visi laukai yra paliesti
    setEnteredNameIsTouched(true);
    if (!enteredNameIsValid) return;
    setEnteredName('');
    setEnteredNameIsTouched(false);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameIsTouched(true);
    if (!enteredNameIsValid) return;
  };

  return (
    <form onSubmit={formSubmissionhandler}>
      <div className={'form-control ' + (nameInputIsInvalid && 'invalid')}>
        <label htmlFor='name'>Your Name</label>
        <input onChange={nameChangeHandler} onBlur={nameInputBlurHandler} type='text' id='name' value={enteredName} />
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
