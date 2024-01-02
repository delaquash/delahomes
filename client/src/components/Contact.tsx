import axios from "axios"
import { useState } from "react";
import { useQuery } from "react-query"

/* eslint-disable @typescript-eslint/no-explicit-any */

interface listProps {
  listing: any
}

interface LandLordProps {
  username: string;
  email: string;
  avatar: string;
  name?: string;
}
const Contact = ({ listing }: listProps) => {
  const[message, setMessage ] = useState("")
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
            Contact <span className="font-semibold">{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
          
          />

        </div>
      )}
    </>
  )
}

export default Contact;