import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";
import { useState } from "react";
import { listProps } from "../../types/dataTypes";

interface Params {
  listingId?: string;
}

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params: Params = useParams();
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
                    backgroundSize: 'cover',
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
                <p className='text-2xl font-semibold'>
                  {listing.name} - ${' '}

                </p>
          </div>
        </div>
      )}
    </>
  );
    </main>
  );
};

export default Listing;
