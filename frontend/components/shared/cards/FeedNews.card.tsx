import Image from 'next/image';
import Row from '../row';
import { CardDescription, CardHeading } from '../typography';

interface IFeedNewsCardProps {
  data: any;
}

const FeedNewsCard: React.FC<IFeedNewsCardProps> = ({ data }) => {
  const { title, description, newsDate, newsDay, newsTime, headerImage } = data;

  return (
    <Row className="w-full bg-orange-100 border border-slate-200 rounded-3xl px-6 items-start">
      <Row className="mt-3 gap-2 w-[30%] items-center">
        <CardHeading title={newsDate} />
        <CardDescription title={newsDay} className="ml-4" />
        <CardDescription title={'-----'} />
        <CardDescription title={newsTime} />
      </Row>

      <Row className="w-[65%]">
        <Image
          alt="Header Image"
          src={headerImage}
          width={200}
          height={150}
          className="object-cover rounded-lg"
          loading="eager"
        />

        <Row className="flex-col gap-3 mt-3 ml-3">
          <CardHeading title={title} />
          <CardDescription title={description} />

          <CardDescription
            title="Read More"
            className="text-indigo-600 cursor-pointer underline text-sm font-[500]"
            onClick={() => alert('Read more page is not available yet.')}
          />
        </Row>
      </Row>
    </Row>
  );
};

export default FeedNewsCard;
