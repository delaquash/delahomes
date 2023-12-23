import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
interface Params {
  listingId: string;
}

const Listing = () => {
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const params: Params = useParams();
    const { listingId } = params;


    
    useEffect(() => {
        setLoading(true)
        const fetchList = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/list/get-list/${params.listingId}`)
                if (data.success === false) {
                    setError(true)
                    return;
                }
                setListing(data)
            } catch (error) {
                setLoading(false)
                setError(true)
            }
            
        }
        fetchList();
    }, [params.listingId])
  return (
      <div>{ listing && listing.name}</div>
  )
}

export default Listing