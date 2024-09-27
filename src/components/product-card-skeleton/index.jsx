import { Skeleton } from "../ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="w-52">
      <div className="rounded-lg shadow-lg ">
        <Skeleton className="w-full aspect-square" />
        <div className="p-2">
          <Skeleton className="h-5 w-full mb-2"></Skeleton>
          <Skeleton className="h-3 w-3/4 mb-1"></Skeleton>
          <Skeleton className="h-5 w-full mb-2"></Skeleton>
          <div className="flex flex-col items-center justify-between gap-2 mt-2">
            <Skeleton className="h-10 w-full"></Skeleton>
            <Skeleton className="h-10 w-full"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
