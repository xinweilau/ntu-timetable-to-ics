import React, { useState } from 'react';
import './TextBox.css';

function TextBox() {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <div className="textBoxWrapper">
            <input type="text" placeholder="e.g. 11 August 2021" />
            <a className="button textbox-inline-button">Confirm</a>
        </div>
    );
}

export default TextBox;