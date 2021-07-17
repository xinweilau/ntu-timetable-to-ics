import React from 'react';

type Props = {
    title: string,
    children: JSX.Element,
};

function ContentSection({ title, children }: Props) {
    return (
        <section>
            <div>
                <h2>{title}</h2>
                { children }
            </div>
        </section>
    );
}

export default ContentSection;