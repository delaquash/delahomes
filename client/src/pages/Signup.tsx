import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

interface MyChangeEvent {
  target: {
    id: string;
    value: string;
  };
}

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e: MyChangeEvent): void => {
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
    const res =await axios.post("http://localhost:5000/api/auth/signup", {
      Headers: {
        "Content-Type": "application/json"
      }
    },formData);

    // Assuming the response is JSON and you want the data property
    const data = await res.data;

    // Check if the signup was not successful
    if (!data.success) {
      // Set error state and stop further execution
      setLoading(false)
      setError(data.message);
      return;
    }

    // Reset error state and navigate to the signin page
    setError(null);
    navigate("/signin");
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
          disabled={loading}
          className="text-white bg-slate-700 p-3 uppercase hover:opacity-95 rounded-lg disabled:opacity-80"
        >
          {loading ? "Loading...": "Sign Up"}
        </button>
      </form>
      <div className="mt-7 gap-4">
        <p className="font-semibold text-2xl">Have an account?</p>
        <Link to="/signin">
          <span className="text-xl text-blue-500 font-semibold cursor-pointer">
            Sign In.
          </span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signup