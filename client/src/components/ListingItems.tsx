import { Link } from "react-router-dom";

interface Listing {
    _id: string;
    imageUrls: string;
    // Add other properties based on the structure of your Listing object
    // For example:
    name: string;
    price: number;
    // ...
  }
  
  export interface ListingItemsProps {
    listing: Listing;
  }
  
  const ListingItems: React.FC<ListingItemsProps> = ({ listing }) => {
    // Your component logic here
    return (
      // JSX for displaying the listing
      <div className="bg-white flex flex-col gap-4">
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} 
            className="h-[320px] sm:h-[220px] w-full transition-scale
            object-cover hover:scale-105 duration-300"
            />
        </Link>
        {listing.name}
      </div>
    )
  };
  

export default ListingItems