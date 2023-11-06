import React, { useState, useEffect } from 'react';
import ColorSelector from 'react-color-selector';

const ColorSelection = ({setColor}) => {
    let [myColor, pickedColor] = useState('');

    useEffect(() => {
        setColor(myColor);
      }, [myColor, setColor]);

    let picker_data = {
        col: 10,
        row: 10,
        width: 300,
        height: 250,
        view: 'both', 
        theme: 'dark',
        title:'Color',
        cellControl:4
    }
    return (
        <div>
            <ColorSelector pallet={picker_data} selectedColor={pickedColor} />
        </div>
    )
}

export default ColorSelection;