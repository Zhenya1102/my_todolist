import {ChangeEvent, FC, KeyboardEvent} from 'react';

type UniversalInputPropsType = {
    value: string
    setTitleInput: (title: string) => void
    callBack: () => void
    error?: string
    setError: (error:string | undefined)=> void
}

export const UniversalInput: FC<UniversalInputPropsType> = (
    {
        value,
        setTitleInput,
        callBack,
        error,
        setError
    }) => {
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.currentTarget.value)
    }
    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (event.key === 'Enter') {
            callBack()
        }
    }
    return (
        <>
            <input
            value={value}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownInputHandler}
            className={error ? 'error' : ''}/>
        </>

    );
};
