import axios from "axios"
import { useQuery } from "react-query"

/* eslint-disable @typescript-eslint/no-explicit-any */

interface listProps {
  listing: any
}

interface LandLordProps {
  username: string;
  email: string;
  avatar: string;
}
const Contact = ({ listing }: listProps) => {
  const {data: landlord, error} = useQuery(['landlord', listing.userRef], async () => {
    const res = await axios.get(`/api/user/${listing.userRef}`);
    return res.data as LandLordProps;
  })

  if(error){
    console.log("Error fetching landlord data", error)
  }
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>
          </p>

        </div>
      )}
    </>
  )
}

export default Contact;