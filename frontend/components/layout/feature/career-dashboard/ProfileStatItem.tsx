import Row from '@/components/shared/row';
import {
  CardDescription,
  CardHeading,
  SectionHeading,
} from '@/components/shared/typography';

interface IProfileStatItemProps {
  title: string;
  percentage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  containerClassName?: string;
}

const ProfileStatItem: React.FC<IProfileStatItemProps> = ({
  title,
  containerClassName,
  percentage,
  Icon,
}) => {
  return (
    <Row
      className={`items-center p-4 justify-between rounded-lg relative ${containerClassName}`}
    >
      <Row className="items-center gap-2">
        <Icon size={40} />
        <CardHeading title={title} />
      </Row>

      <SectionHeading title={percentage} />
      <CardDescription title="%" className="absolute top-2 right-2" />
    </Row>
  );
};

export default ProfileStatItem;
