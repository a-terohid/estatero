const PropertyCardSkeleton = () => {
  return (
    <div className="p-2 border  bg-Neutral overflow-hidden rounded-2x border-Greyscale-100 rounded-2xl animate-pulse">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 rounded-2xl" />
        <div className="top-2 left-2 absolute flex flex-col gap-y-1">
          <div className="h-5 w-20 bg-gray-300 rounded-full" />
          <div className="h-5 w-16 bg-gray-300 rounded-full" />
        </div>
      </div>
      <div className="pt-4 px-2">
        <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded mb-3" />
        <div className="flex items-center gap-x-2 mb-2">
          <div className="h-6 w-16 bg-gray-200 rounded-md" />
          <div className="h-6 w-16 bg-gray-200 rounded-md" />
          <div className="h-6 w-20 bg-gray-200 rounded-md" />
        </div>
        <div className="bg-Greyscale-100 h-[1px] rounded-full mb-2"></div>
        <div className="h-6 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;