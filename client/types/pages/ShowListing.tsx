import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserListProps, StateProps } from "../../types/dataTypes";

export type RootState = {
  user: StateProps;
  // Add other slices if you have more reducers
};

const ShowListing = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState<UserListProps[]>([]);

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const { data } = await axios.get(
        `http://localhost:5000/api/user/listing/${currentUser?._id}`
      );
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError(true);
    }
  };
  
  const handleDelete = async (listingId: string | undefined) => {
      try {
        const { data } =await axios.delete(`http://localhost:5000/api/list/delete/${listingId}`);
        if (data.success === false) {
          console.log(data.message);
          return
        }
      setUserListing((prev) =>
        prev.filter((listing)=> listing._id !== listingId)
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.message);
      }
    }
  return (
    <>
      <button onClick={handleShowListing} className="text-green-700 w-full">
        Show Listing
      </button>
      <p className="mt-5 text-red-700">
        {showListingError ? "Error showing listings" : ""}
      </p>
      {userListing && userListing.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-2xl mt-7 font-semibold">
            Your Listings
          </h1>
          {userListing.map((listing) => (
            <div
              key={listing._id}
              className=" gap-4 flex justify between items-center p-3 border rounded-lg"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  className="h-16 w-16 object-contain"
                  src={listing.imageUrls[0]}
                  alt="List Image"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700
                font-semibold hover:underline truncate flex-1"
              >
                <p className="text-slate-700">{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button onClick={() => handleDelete(listing._id)} className="text-red-700">Delete</button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700">Edit</button>
                </Link>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShowListing;
