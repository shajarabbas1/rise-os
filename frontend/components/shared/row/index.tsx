import React, { ReactNode, HTMLAttributes, forwardRef } from 'react';

interface IRowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Row = forwardRef<HTMLDivElement, IRowProps>(
  ({ children, className = '', ...restProps }, ref) => {
    return (
      <div ref={ref} className={`flex ${className}`} {...restProps}>
        {children}
      </div>
    );
  },
);

Row.displayName = 'Row';

export default Row;
