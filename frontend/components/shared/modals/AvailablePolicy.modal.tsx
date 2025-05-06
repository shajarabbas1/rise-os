/* eslint-disable @typescript-eslint/no-explicit-any */
import Row from '../row';
import { CardDescription, CardHeading } from '../typography';
import { RxCross2 } from 'react-icons/rx';
import { IoEyeOutline } from 'react-icons/io5';

interface IAvailablePolicyModalProps {
  onCancel: any;
  currentPolicy: any;
}

const AvailablePolicyModal: React.FC<IAvailablePolicyModalProps> = ({
  onCancel,
  currentPolicy,
}) => {
  return (
    <div
      onClick={onCancel}
      className="fixed w-screen h-screen inset-0 bg-[#00000078] z-40 flex justify-end items-end"
    >
      <Row
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
        className="flex-col bg-white w-[45%] h-full justify-between rounded-lg items-center"
      >
        <Row className="w-full flex-col gap-4 items-center justify-between">
          <Row className="w-full items-center justify-between p-4 bg-orange-50">
            <Row className="gap-2 items-center">
              <CardHeading title={currentPolicy.name} className="text-center" />
            </Row>

            <RxCross2 size={20} onClick={onCancel} className="cursor-pointer" />
          </Row>

          <Row className=" flex-col w-full  p-3 bg-orange-50 border-[1px] border-slate-200 rounded-2xl">
            <Row className="w-full flex-col gap-2 ">
              <Row className="w-full bg-orange-200 px-2 py-1 rounded-md items-center justify-between">
                <CardDescription title="NDIC POLICY AND PROCEDURE MANUAL" />
                <CardDescription title="QUICK ACTIONS" />
              </Row>

              {[
                { name: '2.1 Consent Form' },
                { name: '2.2 Consent Form' },
                { name: '2.3 Consent Form' },
                { name: '2.4 Consent Form' },
              ].map((item, index) => (
                <Row
                  key={index}
                  className={`items-center justify-between px-2 py-1 ${index % 2 === 0 ? '' : 'bg-orange-200 rounded-md'}`}
                >
                  <CardHeading title={item.name} className='!text-[12px]' />

                  <IoEyeOutline
                    size={20}
                    onClick={() => alert('View in progress...')}
                    className="cursor-pointer"
                  />
                </Row>
              ))}
            </Row>
          </Row>
        </Row>
      </Row>
    </div>
  );
};

export default AvailablePolicyModal;
