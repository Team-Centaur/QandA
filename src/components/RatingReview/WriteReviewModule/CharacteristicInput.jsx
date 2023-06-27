import React, { useState } from 'react';
import './CharacteristicInput.css'

const CharacteristicInput = ({chara}) => {
  // create state for current button selected
  // create object defining selection meaning (by characteristic)
  // render meaning by title
  const [selection, setSelection] = useState(0);
  const [meaning, setMeaning] = useState('none selected');

  const selectionMeanings = {
    Size: [
      'A size too small',
      '1/2 a size too small',
      'Perfect',
      '1/2 a size too big',
      'A size too wide'
    ],
    Width: [
      'Too narrow',
      'Sligthly narrow',
      'Perfect',
      'Slightly wide',
      'Too wide'
    ],
    Comfort: [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Ok',
      'Comfortable',
      'Perfect'
    ],
    Quality: [
      'Poor',
      'Below average',
      'What I expected',
      'Pretty great',
      'Perfect'
    ],
    Length: [
      'Runs short',
      'Runs slightly short',
      'Perfect',
      'Runs slightly long',
      'Runs long'
    ],
    Fit: [
      'Runs tight',
      'Runs slightly tight',
      'Perfect',
      'Runs slightly long',
      'Runs long'
    ]
  }

  const onSelection = (e) => {
    let value = parseInt(e.target.value);
    setSelection(value);
    let selectionMeaning = selectionMeanings[chara[0]][value - 1];
    setMeaning(selectionMeaning);
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