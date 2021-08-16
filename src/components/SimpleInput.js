import { useState, useRef } from 'react';
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const nameInputRef = useRef();
  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const formSubmissionhandler = (e) => {
    e.preventDefault();
    console.log('form submission in progress');
    // naudojant ref gauti ivesties lauko reiksme
    // jis naudojamas retais atvejais, nerekomenduojama updatinti dom per ref
    const enteredValue = nameInputRef.current.value;
    console.log('value using ref: ', enteredValue);
    setEnteredName('');
  };
  return (
    <form onSubmit={formSubmissionhandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} onChange={nameChangeHandler} type='text' id='name' value={enteredName} />
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
