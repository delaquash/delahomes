import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Listing = () => {
    const [listing, setListing] = useState(null);
    const params = useParams
    useEffect(() => {
          const fetchList = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/list/get-list/${params.listingId}`)
              setListing(data)
          }   
        fetchList()
    })
  return (
    <div>Listing</div>
  )
}

export default Listing