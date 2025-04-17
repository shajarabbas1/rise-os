import { CardHeading } from "../typography";

interface ICircleCardProps {
  count: number | string;
  className?: string;
}

const CircleCard: React.FC<ICircleCardProps> = ({ count, className }) => {
  return (
    <div
      className={` bg-orange-100 rounded-full flex justify-center items-center ${className}`}
    >
      <CardHeading title={count}/>
    </div>
  );
};

export default CircleCard;
