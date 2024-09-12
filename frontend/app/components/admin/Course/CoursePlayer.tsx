import React, { useEffect } from 'react';
import axios from "axios";

type Props = {
    videoUrl: string;
    title: string;
}

const CoursePlayer = ({title, videoUrl}: Props) => {
    const [videoData, setVideoData] = useState({
        otp:"",
        playnackInfo: ""
    })
  return (
    <div>CoursePlayer</div>
  )
}

export default CoursePlayer