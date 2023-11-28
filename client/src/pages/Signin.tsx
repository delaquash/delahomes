// import axios from "axios";
import Oauth from "../components/Oauth";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

interface MyChangeEvent {
  target: {
    id: string;
    value: string;
  };
}

function SignIn() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e: MyChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    // Set loading state to true while waiting for the response
    setLoading(true);
    // Make the signup request to the server
    const res = await fetch("http://localhost:5000/api/auth/signin",{
        method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      
  })
    // Assuming the response is JSON and you want the data property
    const data = await res.json();

    // Check if the signup was not successful
    if (!data.success) {
      // Set error state and stop further execution
      setLoading(false)
      setError(data.message);
      return;
    }
    // Reset error state and navigate to the signin page
    setLoading(false)
    setError(null);
    navigate("/");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handle errors here
    setLoading(false);
    
    // Check if the error has a specific message, otherwise provide a generic one
    setError(error.message || "An error occurred.");
    
    console.error("Error:", error);
  } finally {
    // Ensure that loading state is set to false regardless of success or failure
    setLoading(false);
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
          disabled={loading}
          className="text-white bg-slate-700 p-3 uppercase hover:opacity-95 rounded-lg disabled:opacity-80"
        >
          {loading ? "Loading...": "Sign In"}
        </button>
        <Oauth />
      </form>
      <div className="mt-7 gap-4">
        <p className="font-semibold text-2xl">Dont have an account?</p>
        <Link to="/signup">
          <span className="text-xl text-blue-500 font-semibold cursor-pointer">
            Sign Up.
          </span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn