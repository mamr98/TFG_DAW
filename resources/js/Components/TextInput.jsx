import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-emerald-700 focus:ring-emerald-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-emerald-700 dark:focus:ring-emerald-400 ' +
                className
            }
            ref={localRef}
        />
    );
});
