import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useEffect, useState } from "react";


function Header() {
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set("searchTerm", searchTerm)
      const searchQuery = urlParams.toString()
      navigate(`/search?${searchQuery}`)
  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchUrlParams = urlParams.get("searchTerm");
    if(searchUrlParams){
      setSearchTerm(searchUrlParams)
    }
  },[location.search])
  
  return (
    <header className="shadow-md bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap gap-4">
            <span className="text-slate-500">Delahomes</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
            onChange={handleChange}
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64 font-bold"
            />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/home">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="Avatar_image"
              />
            ) : (
              <li className="sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
