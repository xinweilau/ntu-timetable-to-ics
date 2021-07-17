import React from 'react';
import './TextBox.css';

type Props = {
    onChange: any
}

function TextBox({ onChange }: Props) {
    return (
        <div className="textBoxWrapper">
            <input type="date" onChange={(e) => onChange(e.target.value)} placeholder="e.g. 11 August 2021" />
            <a className="button textbox-inline-button">Confirm</a>
        </div>
    );
}

export default TextBox;