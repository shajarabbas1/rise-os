import { ITypoGraphyProps } from './types';

const CardHeading: React.FC<ITypoGraphyProps> = ({ title, className }) => {
  return (
    <h3
      className={`capitalize text-[16px] font-bold  text-center ${className}`}
    >
      {title}
    </h3>
  );
};

export default CardHeading;
