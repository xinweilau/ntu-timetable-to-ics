import React from 'react';
import './FormSection.css';

type Props = {
    title: string,
    children: JSX.Element,
};

function FormSection({ title, children }: Props) {
    return (
        <section>
            <div>
                <h2>{title}</h2>
                { children }
            </div>
        </section>
    );
}

export default FormSection;