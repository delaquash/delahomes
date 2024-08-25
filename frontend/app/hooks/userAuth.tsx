/**
 * The function `userAuth` uses `useSelector` from React Redux to check if a user is authenticated and
 * returns a boolean value accordingly.
 * @returns The `userAuth` function is returning a boolean value based on whether the `user` object
 * exists in the Redux state. If the `user` object exists, the function returns `true`, otherwise it
 * returns `false`.
 */
import { useSelector } from "react-redux";

export default function userAuth () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useSelector((state: any) => state.auth)
    if(user){
        return true
    } else {
        return false
    }
}