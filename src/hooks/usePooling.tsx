import React, {useEffect} from 'react';

export function usePooling(callback: () => void, interval: number) {

    useEffect(() => {
        let int = setInterval(callback, interval);
        return () => {
            clearInterval(int);
        };
    }, [interval]);

}