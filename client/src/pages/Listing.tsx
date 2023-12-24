import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle"

interface Params {
  listingId?: string;
}

const Listing = () => {
    SwiperCore.use([Navigation])
    const params: Params = useParams();
    const { listingId } = params;
    
    const { data: listing, error, isLoading } = useQuery([], async () => {
        const { data } = await axios.get(`http://localhost:5000/api/list/get-list/${listingId}`);
        return data;
    });

    if (error: string || !listing || listing.success === false) {
    return <div>Error loading listing data.</div>;
  }

  return (
    <main>
      {isLoading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error ||
        !listing ||
        (listing.success === false && (
          <p className="text-center my-7 text-2xl">
            Error loading listing data...
          </p>
        ))}
          {listing &&
             <h1>listing.name</h1> 
          }
    </main>
  );
}

export default Listing