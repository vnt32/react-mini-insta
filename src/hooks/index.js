import {useState} from 'react';

export function useInput(init = ''){
    const [value, setValue] = useState(init);

    const onChange = (e) => setValue(e.target.value)

    return {
        bind: {
            value,
            onChange
        },
        value
    }
}
