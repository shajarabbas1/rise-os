import Row from '@/components/shared/row';
import { CardDescription, CardHeading } from '@/components/shared/typography';
import Image from 'next/image';
import React from 'react';

interface IWatchVideoProps {
  handleOnClick: () => void;
  imgURL: string;
  title: string;
  className?: string;
}

const WatchVideo: React.FC<IWatchVideoProps> = ({
  handleOnClick,
  imgURL,
  title,
  className,
}) => {
  return (
    <Row className={`items-center gap-4 ${className}`}>
      <Image
        alt="Video Guide"
        height={40}
        width={60}
        src={imgURL}
        className="rounded-lg cursor-pointer"
        onClick={handleOnClick}
      />

      <CardHeading
        title={title}
        className="cursor-pointer underline text-indigo-300"
        onClick={handleOnClick}
      />
    </Row>
  );
};

/**
 * We are wrapping WatchVideo in React.memo to prevent unnecessary re-renders.
 * It will now only re-render if its props (handleOnClick or imgURL) change.
 * Since handleOnClick is memoized using useCallback in the parent,
 * this ensures WatchVideo stays pure and efficient.
 */
export default React.memo(WatchVideo);
