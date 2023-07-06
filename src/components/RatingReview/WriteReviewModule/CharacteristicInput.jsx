import React, { useState } from 'react';
import characteristicMeanings from '../characteristicMeanings.js';
import './WriteReview.css';

const CharacteristicInput = ({ chara, characteristicsInput, setCharacteristicsInput }) => {
  // create state for current button selected
  // create object defining selection meaning (by characteristic)
  // render meaning by title
  const [selection, setSelection] = useState(0);
  const [meaning, setMeaning] = useState('none selected');

  const onSelection = (e) => {
    let value = parseInt(e.target.value);
    setSelection(value);
    let selectionMeaning = characteristicMeanings[chara[0]][value - 1];
    setMeaning(selectionMeaning);
    setCharacteristicsInput(Object.defineProperty(characteristicsInput, chara[1].id, {value, configurable: true}));
  };

  return (
    <div className={chara[0]} key={chara[0]}>
      <h4>{chara[0]}</h4>
      <div>{meaning}</div>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='1' name={chara[0]} onChange={onSelection} required/>
        <label htmlFor={chara[0]}> 1 </label>
      </div>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='2' name={chara[0]} onChange={onSelection} />
        <label htmlFor={chara[0]}> 2 </label>
      </div>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='3' name={chara[0]} onChange={onSelection} />
        <label htmlFor={chara[0]}> 3 </label>
      </div>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='4' name={chara[0]} onChange={onSelection} />
        <label htmlFor={chara[0]}> 4 </label>
      </div>
      <div className='chara'>
        <input type='radio' id={chara[0]} value='5' name={chara[0]} onChange={onSelection} />
        <label htmlFor={chara[0]}> 5 </label>
      </div>
    </div>
  );
}

export default CharacteristicInput;