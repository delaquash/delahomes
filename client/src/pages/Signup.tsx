import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { signInFail, signInStart, signInSuccess} from "../state/reducers/userSlice";
import Oauth from '../components/Oauth';

interface MyChangeEvent {
  target: {
    id: string;
    value: string;
  };
}


function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { error } = useSelector((state: RootState)=>state.user)

 // Create a mutation for sign-in using React Query
  const signInMutation = useMutation(
    async (formData: { [key: string]: string }) => {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
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

    const handleChange = (e: MyChangeEvent)=> {
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
      <h1 className="text-center font-semibold text-4xl my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          type="text"
          id="username"
          placeholder="Username..."
          className="border p-5 font-semibold focus:outline-none rounded-lg"
        />
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
          {signInMutation.isLoading ? "Loading...": "Sign Up"}
        </button>
        <Oauth />
      </form>
      <div className="mt-7 gap-4">
        <p className="font-semibold text-2xl">Have an account?</p>
        <Link to="/signin">
          <span className="text-xl text-blue-500 font-semibold cursor-pointer">
            Sign In.
          </span>
        </Link>
      </div>
      {signInMutation.error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signup