/* eslint-disable @typescript-eslint/no-explicit-any */
import Row from '@/components/shared/row';
import { CardDescription } from '@/components/shared/typography';

const AdminNavigation: React.FC<{
  title: string;
  isSelected: boolean;
  onClick: () => void;
  Icon: any;
}> = ({ title, isSelected, onClick, Icon }) => {
  return (
    <Row
      onClick={onClick}
      className={`fontPoppins cursor-pointer gap-3 p-4 items-center  w-full hover:bg-[#fda10c11] font-medium ${
        isSelected ? 'bg-[#fda10c11]  border-l-4 border-[#fda10c]' : '  '
      }`}
    >
      <Icon size={20} className={'w-[8%]' } />

      <CardDescription title={title} className="text-[14px] w-[70%]" />
    </Row>
  );
};

export default AdminNavigation;
