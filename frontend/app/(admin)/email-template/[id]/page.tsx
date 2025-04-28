import Row from '@/components/shared/row';
import { PrimaryHeading } from '@/components/shared/typography';

interface IPageProps {
  params: { id: string };
}
const Page: React.FC<IPageProps> = async ({ params: { id } }) => {
  return (
    <Row className="w-full h-full flex justify-center items-center">
      <PrimaryHeading className="mt-1/2" title={`Email template with ${id}`} />
    </Row>
  );
};

export default Page;
