import React from 'react';
import './TextArea.css';

type Props = {
    value: string,
    onChange: any
}

function TextArea({ value, onChange }: Props) {
    return (
        <div>
            <textarea onChange={(e) => onChange(e.target.value)} value={value} placeholder="Paste course schedule here" />
            <a className="button">Confirm</a>
        </div>
    );
}

export default TextArea;