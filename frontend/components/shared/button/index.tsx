/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactIcon from '../react-icon';
import Row from '../row';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export interface IButton {
  title: string;
  className?: string;
  linkTo?: string;
  handleOnClick?: any;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
  iconColor?: string;
  btnClassName?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IButton> = ({
  title,
  className,
  handleOnClick,
  Icon,
  iconColor,
  btnClassName,
  disabled,
}) => {
  return (
    <Row
      className={`rounded-md cursor-pointer gap-1  items-center ${className} `}
    >
      {Icon && (
        <ReactIcon
          Icon={Icon}
          className={`${iconColor ? iconColor : 'text-[#f4a300]'}`}
        />
      )}

      <button
        className={`px-3 py-1 text-[14px] rounded-md cursor-pointer ${inter.className} ${btnClassName}`}
        onClick={handleOnClick}
        disabled={disabled}
      >
        {title}
      </button>
    </Row>
  );
};
export default IconButton;
