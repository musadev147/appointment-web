import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  animate = true,
  ...props
}) => {
  const baseClasses = 'rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-white dark:bg-slate-900/60 p-6 shadow-sm shadow-slate-100/50 dark:shadow-none transition-shadow';
  const hoverClasses = hoverEffect ? 'hover:shadow-lg hover:shadow-primary/5 hover:border-teal-100 dark:hover:border-teal-900/40' : '';

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.4 }}
        className={`${baseClasses} ${hoverClasses} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`flex flex-col gap-1.5 mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`font-display text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100 ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-xs text-slate-500 dark:text-slate-400 ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-end ${className}`}>
    {children}
  </div>
);
