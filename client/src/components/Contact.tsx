import axios from "axios"
import { SetStateAction, useState } from "react";
import { useQuery } from "react-query"
import { Link } from "react-router-dom";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface listProps {
  listing: any;
}

interface LandLordProps {
  username: string;
  email: string;
  avatar: string;
  name?: string;
}
const Contact = ({ listing }: listProps) => {
  const[message, setMessage ] = useState("")
  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(e.target.value);
  };
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
            name="message"
            id="message"
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>
          <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}
    </>
  )
}

export default Contact;