import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

const MainNav = () => {
    const { loginWithRedirect } = useAuth0();
  return (
    <Button
        onClick={async ()=> await loginWithRedirect()}
        variant="ghost"
        className="font-bold hover:text-orange-500 hover:bg-white"
    >
        Log In
    </Button>
  )
}

export default MainNav;


// No: YJ08 RZWSTC:Nissan Juke CH:SJNFBAF1507028399 YEAR:2014 Reg. No:HJ64LBOSTC:Mercedes CLS350 CH:WDD2193562A048465 YEAR:2005 Reg. No:EX55MYKSTC:DAF 45 CH:XLRAE45BF0L250664 YEAR:2003 Reg. No:DX53TZUSTC:IVECO T...
// DAF 95XF CH:XLRTG47MSOE917161 Reg. No:11 WH 3483STC:DAF 85 CF CH:XLRTG85SCOE583324STC:VOLVO FL6 18 CH:YV2E4CBAIIB294067 Reg. No:01 D 76788STC:MERCEDES 814 CH:WDB67401225432792 YEAR:1997 Reg. No:89-OY-1971