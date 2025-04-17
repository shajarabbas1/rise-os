import Row from '../row';
import { CardDescription, CardHeading } from '../typography';

interface ICategoryCardProps {
  title: string;
  description?: string;
  tags?: string[];
  containerClassName: string;
  handleDetailClick?: () => void;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({
  title,
  description,
  tags,
  containerClassName,
  handleDetailClick,
}) => {
  return (
    <Row
      className={`bg-orange-100 rounded-lg p-3 flex-col items-start gap-3 ${containerClassName}`}
    >
      <CardHeading className="!text-[12px]" title={title} />

      {description && <CardDescription title={description} className="" />}

      {tags && tags.length && (
        <Row className="flex-col gap-2">
          {tags?.map((tag, index) => (
            <CardDescription
              key={index}
              title={tag}
              className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full"
            />
          ))}
        </Row>
      )}

      {handleDetailClick && (
        <CardDescription
          title="Details"
          className="cursor-pointer underline"
          onClick={handleDetailClick}
        />
      )}
    </Row>
  );
};

export default CategoryCard;
