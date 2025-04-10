import React, { ReactNode, HTMLAttributes } from 'react';

interface IRowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Row = ({ children, className, ...restProps }: IRowProps) => {
  return (
    <div className={`flex ${className}`} {...restProps}>
      {children}
    </div>
  );
};

export default Row;
