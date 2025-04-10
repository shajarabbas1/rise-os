import { ITypoGraphyProps } from './types';

const SectionHeading: React.FC<ITypoGraphyProps> = ({ title, className }) => {
  return (
    <h2
      className={`capitalize text-[28px] font-black  text-center ${className}`}
    >
      {title}
    </h2>
  );
};

export default SectionHeading;
