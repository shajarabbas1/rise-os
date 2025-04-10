import { ITypoGraphyProps } from './types';

const CardDescription: React.FC<ITypoGraphyProps> = ({ title, className }) => {
  return (
    <p className={`capitalize text-[12px] font-normal  ${className}`}>
      {title}
    </p>
  );
};

export default CardDescription;
