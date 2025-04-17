import CircleCard from '../cards/CircleCount.card';
import Row from '../row';
import { CardHeading } from '../typography';
import { RxCross2 } from 'react-icons/rx';

interface IVideoTutorialModalProps {
  onCancel: () => void;
  heading: string;
  stepNumber: string | number;
}

const VideoTutorialModal: React.FC<IVideoTutorialModalProps> = ({
  heading,
  onCancel,
  stepNumber,
}) => {
  return (
    <div
      onClick={onCancel}
      className="fixed w-screen h-[100vh] inset-0 bg-[#00000078] flex justify-center items-center z-50"
    >
      <Row
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
        className="flex-col bg-white w-[70%] h-[750px] justify-between p-4 rounded-lg items-center"
      >
        <Row className="w-full items-center justify-between">
          <Row className="gap-2 items-center">
            <CircleCard count={stepNumber} className="size-[40px]" />

            <CardHeading title={heading} className="text-center" />
          </Row>

          <RxCross2 size={20} onClick={onCancel} className="cursor-pointer" />
        </Row>

        <video
          src="https://videos.pexels.com/video-files/31421894/13403977_1920_1080_24fps.mp4"
          className="w-full h-[650px] object-cover rounded-md"
          autoPlay
          controls
        />
      </Row>
    </div>
  );
};

export default VideoTutorialModal;
