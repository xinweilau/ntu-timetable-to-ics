import React from 'react';
import './TextArea.css';

function TextArea() {
    return (
        <div>
            <textarea placeholder="Paste course schedule here" />
            <a className="button">Confirm</a>
        </div>
    );
}

export default TextArea;