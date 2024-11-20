// import useUser from "@/hooks/auth/useUser";
// import { Redirect } from "expo-router";
// // import Loader from "@/components/loader/loader";

import { Redirect } from "expo-router";
import React from "react";
import { useState } from "react";

// export default function TabsIndex() {
//   // const { loading, user } = useUser();
//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         // <Redirect href={!user ? "/(routes)/onboarding" : "/(tabs)"} />
//       )}
//     </>
//   );
// }


export default function TabsIndex() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  return (
    
  <Redirect href={!isLoggedIn ? "/(routes)/onboarding" : "/home"}/>
  )
}