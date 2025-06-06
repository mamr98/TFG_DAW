export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-justify font-semibold uppercase tracking-widest text-white ease-in-out hover:bg-gray-700 focus:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-white dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 transition-transform duration-200 hover:scale-105 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
