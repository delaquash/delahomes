import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Profile() {
  const { currentUser } = useSelector((state: RootState)=> state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex-col flex gap-4">
        <img
          src={currentUser}
          alt="Profile_Picture"
          className="rouded-full object-cover cursor-pointer h-24 w-24 self-center mt-2"
        />
        <input type="text" placeholder="Username" className="border p-3 rounded-lg"/>
        <input type="email" placeholder="Email" className="border p-3 rounded-lg"/>
        <input type="text" placeholder="Password" className="border p-3 rounded-lg"/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
            Update
        </button>
      </form>
      <div className="flex mt-5 justify-between">
        <span className="cursor-pointer text-red-700">Delete Account</span>
        <span className="cursor-pointer text-red-700">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile