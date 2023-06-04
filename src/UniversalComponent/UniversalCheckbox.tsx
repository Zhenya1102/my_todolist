import React, {ChangeEvent} from 'react';

type UniversalCheckbox = {
    callBack: (value: boolean) => void
    checked: boolean
}

export const UniversalCheckbox: React.FC<UniversalCheckbox> = (props) => {
    const {callBack, checked} = props
    const onChangeCheckboxHandler = (event:ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked)
    }
    return (
        <input type="checkbox" onChange={onChangeCheckboxHandler} checked={checked}/>
    );
};
