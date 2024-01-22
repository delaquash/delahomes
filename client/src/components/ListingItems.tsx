import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md"
import { UserListProps } from "../../types/dataTypes";
  
  export interface ListingItemsProps {
    listing: UserListProps;
  }
  
  const ListingItems: React.FC<ListingItemsProps> = ({ listing }) => {
    // Your component logic here
    return (
      // JSX for displaying the listing
      <div
        className="bg-white shadow-md hover:shadow-lg transition-shadow 
        overflow-hidden rounded-lg w-full sm:w-[330px]"
      >
        <Link to={`/listing/${listing._id}`}>
          <img
            alt="Listing Cover"
            src={listing.imageUrls[0]}
            className="h-[320px] sm:h-[220px] w-full transition-scale
                object-cover hover:scale-105 duration-300"
          />
        </Link>
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm truncate line-clamp-2">{listing.description}</p>
          <p className="text-slate-500 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
          </p>
        </div>
      </div>
    );
  };
  

export default ListingItems