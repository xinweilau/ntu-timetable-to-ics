import React from 'react';
import './TextBox.css';

type Props = {
    onChange: any
}

function TextBox({ onChange }: Props) {

    const updateTextBox = (text: string) => {
        onChange(text);

        // @ts-ignore
        document.getElementById("txtDate").style.color = "var(--black)";
    }

    return (
        <div className="textBoxWrapper">
            <input id="txtDate" type="date" onChange={(e) => updateTextBox(e.target.value)} placeholder="e.g. 11 August 2021" />
            <a className="button textbox-inline-button">Confirm</a>
        </div>
    );
}

export default TextBox;