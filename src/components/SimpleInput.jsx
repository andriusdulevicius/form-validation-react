import { useState, useRef } from 'react';
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const nameInputRef = useRef();
  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const formSubmissionhandler = (e) => {
    e.preventDefault();
    //formos siuntimas reiskia , kad visi laukai yra paliesti
    setEnteredNameIsTouched(true);
    // validacija
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return console.log(`Field cannot be empty`);
    }
    console.log('form submission in progress');
    // naudojant ref gauti ivesties lauko reiksme
    // jis naudojamas retais atvejais, nerekomenduojama updatinti dom per ref
    const enteredValue = nameInputRef.current.value;
    console.log('value using ref: ', enteredValue);
    setEnteredName('');
    setEnteredNameIsValid(true);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameIsTouched(true);
  };
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
  return (
    <form onSubmit={formSubmissionhandler}>
      <div className={'form-control ' + (nameInputIsInvalid && 'invalid')}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
          type='text'
          id='name'
          value={enteredName}
        />
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty</p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
