const SkeletonPictureDescription = () => {
  const widthOptions = [
    "w-full",
    "w-full",
    "w-full",
    "w-3/4",
    "w-1/2",
    "w-2/3",
  ];
  const skelArray = Array.from(Array(12).keys());
  return (
    <div className="flex flex-col gap-y-2">
      <div className="h-7 w-1/2  rounded bg-gray-300 animate-pulse mb-4" />
      {skelArray.map((item) => (
        <div
          className={`h-5 ${
            widthOptions[Math.floor(Math.random() * 5)]
          } rounded bg-gray-300 animate-pulse`}
          key={item}
        />
      ))}
    </div>
  );
};

export default SkeletonPictureDescription;
