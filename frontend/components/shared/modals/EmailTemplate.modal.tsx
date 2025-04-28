import { IEmailTemplate } from '@/types/email-template.type';
import Row from '../row';
import { CardDescription, CardHeading } from '../typography';
import { RxCross2 } from 'react-icons/rx';

interface IEmailTemplateModalProps {
  onCancel: () => void;
  templateData: IEmailTemplate;
}

const EmailTemplateModal: React.FC<IEmailTemplateModalProps> = ({
  onCancel,
  templateData,
}) => {
  return (
    <div
      onClick={onCancel}
      className="fixed w-screen h-screen inset-0 bg-[#00000078] z-40 flex justify-center items-center"
    >
      <Row
        onClick={e => e.stopPropagation()}
        className="flex-col bg-white w-[45%] min-h-[450px] overflow-x-hidden overflow-y-scroll noScrollbar justify-between rounded-lg items-center"
      >
        <Row className="w-full flex-col gap-4 items-center justify-between">
          <Row className="w-full items-center justify-between p-4 bg-orange-50">
            <Row className="flex-col gap-1 items-start">
              <CardHeading
                title={templateData.subject}
                className="text-center"
              />

              <Row className="items-center gap-2">
                <CardDescription
                  title={templateData.group}
                  className="bg-indigo-200  rounded-md  px-2 py-1"
                />

                {templateData.isSystemDefault && (
                  <CardDescription
                    title={'System Generated'}
                    className="bg-indigo-200  rounded-md  px-2 py-1"
                  />
                )}

                {templateData.archived && (
                  <CardDescription
                    title={'Not In Used'}
                    className="bg-red-200  rounded-md  px-2 py-1"
                  />
                )}
              </Row>
            </Row>

            <RxCross2 size={20} onClick={onCancel} className="cursor-pointer" />
          </Row>

          <Row className="w-[95%] p-3 bg-orange-50 flex-col gap-4 border-[1px] border-slate-200 rounded-2xl">
            {[
              {
                tiltle: templateData.htmlContent,
                className: 'bg-orange-100 ',
              },
              { tiltle: templateData.metaData, className: 'bg-orange-200 ' },
            ].map((item, index) => (
              <CardDescription
                key={index}
                title={item.tiltle}
                className={`rounded-md p-2 ${item.className}`}
              />
            ))}
          </Row>
        </Row>
      </Row>
    </div>
  );
};

export default EmailTemplateModal;
