import ErrorPage from '../../../ui/ErrorPage';
import Pagination from '../../../ui/Pagination';
import SpinnerFull from '../../../ui/SpinnerFull';
import WishListItem from './WishListItem';
import { useWishlist } from './useWishlist';

function WishList() {
  const { isLoading, wishlist, error, count, refetch } = useWishlist();

  if (isLoading) return <SpinnerFull />;
  if (error) return <ErrorPage refetch={refetch} type="full" />;

  return (
    <div className="">
      <div className="space-y-5">
        <h1 className="text-body font-heading text-xl font-medium capitalize">
          Saved Items ({count})
        </h1>
        <div className=" space-y-5">
          {wishlist.data.map((item) => (
            <WishListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Pagination count={count} border={false} />
    </div>
  );
}

export default WishList;
