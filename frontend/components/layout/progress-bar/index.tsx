const ProgressBar: React.FC<{ colorClassName?: string }> = ({
  colorClassName,
}) => {
  return (
    <div className="relative h-2 my-3 ml-3">
      {/* Left curved cap */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 size-4 bg-orange-400 z-10 rotate-45 rounded-sm ${colorClassName}`}
      />

      {/* Vertical line */}
      <div
        className={`absolute left-[6px] h-[40px] w-1 bg-orange-300 -top-[15px] ${colorClassName}`}
      />

      {/* Horizontal line */}
      <div
        className={`absolute -left-2 w-[20px] h-1 bg-orange-300 top-1/2 -translate-y-1/2 ${colorClassName}`}
      />
      <div
        className={`absolute left-3 w-[200px] h-1 bg-orange-300 top-1/2 -translate-y-1/2 ${colorClassName}`}
      />
    </div>
  );
};

export default ProgressBar;
