import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../state/reducers/userSlice";


const Oauth = () => {
    const dispatch = useDispatch()
    const handleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch("api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    imageUrl: result.user.photoURL
                })
            })
            const data = await res.json()
            dispatch(signInSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }
  return (
      <button
        type="button"
        onClick={handleClick}
        className="bg-red-700 rounded-lg uppercase p-3 text-white hover:opacity-95"
      >
          Continue With Google
    </button>
  )
}

export default Oauth