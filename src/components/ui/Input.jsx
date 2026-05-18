import React from 'react';

const Input = React.forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  id,
  icon,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-slate-400 dark:text-slate-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900 ${
            error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium pl-1">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
