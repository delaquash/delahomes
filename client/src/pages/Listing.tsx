import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaBed, FaChair, FaParking, FaShare } from "react-icons/fa";
import { useState } from "react";
import { listProps } from "../../types/dataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Contact from "../components/Contact";

interface Params {
  listingId?: string;
}

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params: Params = useParams();
  const  { currentUser } = useSelector((state: RootState)=> state.user)
  const { listingId } = params;
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const {
    data: listing,
    error,
    isLoading,
  } = useQuery([], async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/list/get-list/${listingId}`
    );
    return data as listProps;
  });

  const handleNavigator = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <main>
      {isLoading && <p className="text-center my-7 text-2xl">Loading...</p>}
      return (
      <>
        {error || !listing ? (
          <p className="text-center my-7 text-2xl">
            Error loading listing data...
          </p>
        ) : (
          <div>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare className="text-slate-500" onClick={handleNavigator} />
            </div>
            {copied && (
              <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                Link copied!
              </p>
            )}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">
                {listing.name} - ${" "}
                {listing.offer ? listing.discountPrice.toLocaleString("en-NG")
                  : listing.regularPrice.toLocaleString("en-NG")}
                {listing.type === "rent" && " / month"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        )}
      </>
      );
    </main>
  );
};

export default Listing;
