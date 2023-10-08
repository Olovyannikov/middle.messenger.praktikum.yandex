import { useState } from '@/jsx';

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: Event) => {
        setValue((event.target as HTMLInputElement)?.value);
    };

    return {
        value,
        setValue,
        onChange: handleChange,
    };
};