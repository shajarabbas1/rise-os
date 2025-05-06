import { ITypoGraphyProps } from './types';

const PrimaryHeading: React.FC<ITypoGraphyProps> = ({ title, className }) => {
  return (
    <h2
      className={`capitalize text-[16px] font-bold  text-center ${className}`}
    >
      {title}
    </h2>
  );
};

export default PrimaryHeading;
