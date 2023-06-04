import React from 'react';

type UniversalButtonPropsType = {
    name: string
    callBack: () => void
    error?: string
    filter?: string
}

export const UniversalButton: React.FC<UniversalButtonPropsType> = (props) => {
    const {name, callBack, error, filter} = props
    const onclickHandler = () => {
        callBack()
    }
    return (
        <>
            <button onClick={onclickHandler}>{name}</button>
            {error && <div className='error-message'>{error}</div>}
        </>
    );
};

