import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProductCardSkeleton = () => {
  return (
    <div className="flex-1 max-w-sm">
      {/* Image Skeleton */}
      <div className="relative overflow-hidden rounded-t-lg aspect-[16/9]">
        <Skeleton className="w-full h-full" />
      </div>
      <hr className="border-t border-slate-500 w-10/12 m-auto" />

      {/* Price Skeleton */}
      <h1 className="font-bold text-lg">
        <Skeleton width="30%" height={24} />
      </h1>

      {/* Product Name Skeleton */}
      <p className="text-slate-600">
        <Skeleton width="70%" height={20} />
      </p>

      {/* Footer */}
      <footer className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {/* Rating Skeleton */}
          <p>
            <Skeleton width={80} height={32} />
          </p>
          {/* Number of Reviews Skeleton */}
          <Skeleton width={40} height={20} />
        </div>

        {/* Stock Button Skeleton */}
        <Skeleton circle width={40} height={40} />
      </footer>
    </div>
  );
};

export default ProductCardSkeleton;
