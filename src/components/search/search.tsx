import {useId, useRef, useState} from "react";
import {SearchProps} from './model';
import './search.scss';

function Search({onInputEnd, timeout = 1500}: SearchProps) {
    const inputId = useId();
    const input = useRef<HTMLInputElement>(null);
    const [removeClassName, setRemoveClassName] = useState(' hidden');

    function setTimeoutWithDestructor(callback: Function): Function {
        // typeof setTimeout(console.log, 0) === 'number'? :D good to know
        const interval: number = setTimeout(callback, timeout);
        return () => clearTimeout(interval);
    }

    let deleteTimeout: Function;
    function handleInput({target: {value}}: any) {
        if (deleteTimeout) {
            deleteTimeout();
        }

        setRemoveClassName(() => value.length ? '' : ' hidden');
        deleteTimeout = setTimeoutWithDestructor(() => {
            onInputEnd(value);
        })
    }

    const clear = () => {
        if (input.current) {
            input.current.value = '';
        }
    }

    return (
        <div className={'search'} >
            <label className='search-label' htmlFor={inputId}>Search</label>
            <input className='search-input' id={inputId} type="search" autoComplete={'false'} onInput={handleInput} ref={input}/>
            <button className={`search-clear${removeClassName}`} onClick={clear}>X</button>
        </div>
    );
}

export {Search};
