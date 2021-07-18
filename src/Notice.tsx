import React from 'react';
import './Notice.css';

type Props = {
    messageType: string,
    children: JSX.Element
}

function Notice({ messageType, children }: Props) {
    return (
        <section>
            <div className={`${messageType} message`}>
                <h2>Website Notice</h2>
                {children}
            </div>
        </section>
    );
}

export default Notice;