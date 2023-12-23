import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
interface Params {
  listingId: string;
}

const Listing = () => {
    const params: Params = useParams();
    const { listingId } = params;
    
    const { data: listing, error, isLoading } = useQuery([], async () => {
        const { data } = await axios.get(`http://localhost:5000/api/list/get-list/${listingId}`);
        return data;
    });

    if (isLoading) {
    return <div>Loading...</div>;
  }

    if (error || !listing || listing.success === false) {
    return <div>Error loading listing data.</div>;
  }

  return (
      <div>{ listing && listing.name}</div>
  )
}

export default Listing