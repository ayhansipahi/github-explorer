import {useEffect, useState} from "react";

/**
 * Debounce a value
 * @param value
 * @param delay
 * @returns debounced value
 * @see https://usehooks.com/useDebounce/
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
