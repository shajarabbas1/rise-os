import Row from '../row';
import { CardHeading } from '../typography';
import IconButton from '../button';

interface IConfirmationModalProps {
  modalHeading?: string;
  cancelBtnTitle?: string;
  confirmBtnTitle?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  modalHeading="Are you sure?",
  cancelBtnTitle = 'No',
  confirmBtnTitle = 'Yes',
  onCancel,
  onConfirm,
}) => {
  return (
    <div
      onClick={onCancel}
      className="fixed w-screen h-screen inset-0 bg-[#00000078] z-40 flex justify-center items-center"
    >
      <Row
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
        className="flex-col bg-white w-[30%] h-[150px] justify-center rounded-lg items-center"
      >
        <Row className="w-full flex-col gap-4 items-center justify-center">
          <CardHeading title={modalHeading} className="text-center" />

          <Row className="gap-4 border-slate-200 ">
            {[
              {
                title: cancelBtnTitle,
                handleOnClick: onCancel,
                className: 'border-2 border-orange-200',
              },
              {
                title: confirmBtnTitle,
                handleOnClick: onConfirm,
                className: 'bg-orange-200',
              },
            ].map((item, index) => (
              <IconButton
                key={index}
                title={item.title}
                handleOnClick={item.handleOnClick}
                className={`px-4 py-1 ${item.className}`}
              />
            ))}
          </Row>
        </Row>
      </Row>
    </div>
  );
};

export default ConfirmationModal;
