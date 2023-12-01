import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFail, signInStart, signInSuccess } from '../state/reducers/userSlice';
import { RootState } from '../../store';
import Oauth from '../components/Oauth';

interface MyChangeEvent {
  target: {
    id: string;
    value: string;
  };
}

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  error } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Create a mutation for sign-in using React Query
  const signInMutation = useMutation(
    async (formData: { [key: string]: string }) => {
      const response = await axios.post('http://localhost:5000/api/auth/signin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
    {
      // React Query options, you can customize as needed
      onSuccess: (data) => {
        // Reset error state and navigate to the home page
        dispatch(signInSuccess(data));
        navigate('/');
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error:any) => {
        // Handle errors here
        dispatch(signInStart());
        dispatch(signInFail(error.message));
      },
    }
  );

  const handleChange = (e: MyChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call the mutation to sign in
      await signInMutation.mutateAsync(formData);
    } catch (error) {
      // Note: React Query handles onError, so this block may not be necessary
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-4xl my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          type="email"
          id="email"
          placeholder="Email"
          className="border p-5 font-semibold  focus:outline-none rounded-lg"
        />
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Password"
          className="border p-5 font-semibold  focus:outline-none rounded-lg"
        />
        <button
          disabled={signInMutation.isLoading}
          className="text-white bg-slate-700 p-3 uppercase hover:opacity-95 rounded-lg disabled:opacity-80"
        >
          {signInMutation.isLoading ? 'Loading...' : 'Sign In'}
        </button>
        <Oauth />
      </form>
      <div className="mt-7 gap-4">
        <p className="font-semibold text-2xl">Don't have an account?</p>
        <Link to="/signup">
          <span className="text-xl text-blue-500 font-semibold cursor-pointer">Sign Up.</span>
        </Link>
      </div>
      {signInMutation.error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignIn;

// import Oauth from "../components/Oauth";
// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom";
// import {signInFail, signInStart, signInSuccess, } from "../state/reducers/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";

// interface MyChangeEvent {
//   target: {
//     id: string;
//     value: string;
//   };
// }

// function SignIn() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state:RootState) => state.user);
//   const [formData, setFormData] = useState<{ [key: string]: string }>({});

//   const handleChange = (e: MyChangeEvent) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };
  
// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   try {
//     // Set loading state to true while waiting for the response
//     dispatch(signInStart());
//     // Make the signup request to the server
//     const res = await fetch("http://localhost:5000/api/auth/signin",{
//         method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData),
      
//   })
//     // Assuming the response is JSON and you want the data property
//     const data = await res.json();

//     // Check if the signup was not successful
//     if (!data.success) {
//       // Set error state and stop further execution
//       dispatch(signInStart())
//       dispatch(signInFail(data.message));
//       return;
//     }
//     // Reset error state and navigate to the signin page
//     dispatch(signInSuccess(data))
//     navigate("/");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
  
    
//     // Check if the error has a specific message, otherwise provide a generic one
//     dispatch(signInFail(error.message));
//   } 
// };

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-center font-semibold text-4xl my-7">Sign In</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           onChange={handleChange}
//           type="email"
//           id="email"
//           placeholder="Email"
//           className="border p-5 font-semibold  focus:outline-none rounded-lg"
//         />
//         <input
//           onChange={handleChange}
//           type="password"
//           id="password"
//           placeholder="Password"
//           className="border p-5 font-semibold  focus:outline-none rounded-lg"
//         />
//         <button
//           disabled={loading}
//           className="text-white bg-slate-700 p-3 uppercase hover:opacity-95 rounded-lg disabled:opacity-80"
//         >
//           {loading ? "Loading...": "Sign In"}
//         </button>
//         <Oauth />
//       </form>
//       <div className="mt-7 gap-4">
//         <p className="font-semibold text-2xl">Dont have an account?</p>
//         <Link to="/signup">
//           <span className="text-xl text-blue-500 font-semibold cursor-pointer">
//             Sign Up.
//           </span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   )
// }

// export default SignIn