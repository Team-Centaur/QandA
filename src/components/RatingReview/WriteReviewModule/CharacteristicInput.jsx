import React from 'react';
import './CharacteristicInput.css'

const CharacteristicInput = ({chara}) => {
  // create state for each kind of characteristic
  //

  return (
    <div className={chara[0]} key={chara[0]}>
      <h4>{chara[0]}</h4>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='1' name={chara[0]} />
        <label htmlFor={chara[0]}> 1 </label>
      </div>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='2' name={chara[0]} />
        <label htmlFor={chara[0]}> 2 </label>
      </div>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='3' name={chara[0]} />
        <label htmlFor={chara[0]}> 3 </label>
      </div>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='4' name={chara[0]} />
        <label htmlFor={chara[0]}> 4 </label>
      </div>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='5' name={chara[0]} />
        <label htmlFor={chara[0]}> 5 </label>
      </div>
    </div>
  );
}

export default CharacteristicInput;