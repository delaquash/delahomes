import { Loader } from "lucide-react";
import { Button } from "./ui/button";


const LoadingButton = () => {
  return (
   <Button>
    <Loader className="animate-spin mr-2 h-4 w-4" size={16} /> Loading...
   </Button>
  )
}

export default LoadingButton;
