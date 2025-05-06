/* eslint-disable @typescript-eslint/no-explicit-any */
import Row from '@/components/shared/row';
import { CardDescription } from '@/components/shared/typography';

const RegistrationNavigation: React.FC<{
  title: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ title, isSelected, onClick }) => {
  return (
    <Row
      onClick={onClick}
      className={`cursor-pointer gap-3 px-4 py-2 items-center justify-center w-full hover:bg-white hover:rounded-lg font-medium ${
        isSelected ? 'bg-white rounded-lg ' : '  '
      }`}
    >
      <CardDescription title={title} className='text-[14px]'/>
    </Row>
  );
};

export default RegistrationNavigation;
