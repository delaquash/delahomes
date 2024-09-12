import React, { useEffect, useState } from 'react';
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
    useEffect(()=> {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
            videoId: videoUrl
        }).then((res)=>{
            setVideoData(res.data)
        })
    }, [ videoUrl])

  return (
    <div>CoursePlayer</div>
  )
}

export default CoursePlayer