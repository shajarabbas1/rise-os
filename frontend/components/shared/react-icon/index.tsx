import React from 'react';

interface IReactIcon {
  Icon:
    | React.ElementType
    | React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const ReactIcon: React.FC<IReactIcon> = ({ Icon, className, onClick }) => {
  return <Icon className={` object-contain ${className}`} onClick={onClick} />;
};

export default ReactIcon;
