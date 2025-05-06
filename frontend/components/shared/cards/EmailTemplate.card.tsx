import ReactIcon from '../react-icon';
import Row from '../row';
import { CardDescription } from '../typography';
import { BsFillEyeFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';

interface IEmailTemplateCardProp {
  subject: string;
  group: string;
  archived: boolean;
  isSystemDefault: boolean;
  handleViewClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  constainerClassName?: string;
}
const EmailTemplateCard: React.FC<IEmailTemplateCardProp> = ({
  subject,
  archived,
  group,
  isSystemDefault,
  constainerClassName,
  handleDeleteClick,
  handleEditClick,
  handleViewClick,
}) => (
  <Row
    className={`p-2 w-full items-center justify-between text-center rounded-sm ${constainerClassName}`}
  >
    <CardDescription
      title={subject}
      className="w-[50%] lg:w-[60%] text-start"
    />

    <CardDescription title={group} className="w-[16%] border-x" />

    <CardDescription
      title={`${archived ? 'Y' : 'N'}`}
      className={`w-[12%] lg:w-[10%] border-r ${archived ? 'text-red-600' : 'text-green-600'}`}
    />

    <Row className="items-center gap-2 cursor-pointer w-[10%] lg:w-[8%] justify-center">
      {[
        {
          Icon: BsFillEyeFill,
          className: 'text-green-600',
          onClick: handleViewClick,
          show: true,
        },
        {
          Icon: BiSolidMessageSquareEdit,
          className: 'text-indigo-600',
          onClick: handleEditClick,
          show: !isSystemDefault,
        },
        {
          Icon: MdDelete,
          className: 'text-red-600',
          onClick: handleDeleteClick,
          show: !isSystemDefault,
        },
      ]
        .filter(item => item.show)
        .map((item, index) => (
          <ReactIcon
            key={index}
            Icon={item.Icon}
            className={`size-[20px] ${item.className}`}
            onClick={item.onClick}
          />
        ))}
    </Row>
  </Row>
);
export default EmailTemplateCard;
