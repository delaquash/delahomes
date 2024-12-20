import { styles } from '@/app/styles/style'
import React from 'react'
import ReviewCard from '../Review/ReviewCard'

type Props = {}

export const reviews = [
    {
      name: "Emeka Okafor",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      profession: "Student | University of Lagos",
      comment:
        "I had the pleasure of exploring Sapphire, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out Sapphire!",
    },
    {
      name: "Ngozi Nwosu",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      profession: "Full Stack Developer | Abuja Tech Hub",
      comment:
        "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
    },
    {
      name: "Ifeanyi Eze",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      profession: "Computer Systems Engineering Student | Enugu",
      comment:
        "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
    },
    {
      name: "Amaka Adeyemi",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      profession: "Junior Web Developer | Ibadan",
      comment:
        "I had the pleasure of exploring Sapphire, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience.",
    },
    {
      name: "Kemi Olagunju",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      profession: "Full Stack Web Developer | Port Harcourt",
      comment:
        "Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in details. For that, any person at beginner level can complete an integrated project when they watch the videos. Thank you very much. I’m very excited for the next videos. Keep doing this amazing work!",
    },
    {
      name: "Chidinma Uche",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
      profession: "Full Stack Web Developer | Lagos",
      comment:
        "Join Sapphire! Sapphire focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend Sapphire Sync to anyone looking to improve their programming skills and build practical projects. Sapphire Sync is a great resource that will help you take your skills to the next level.",
    },
  ];
  
const Reviews = (props: Props) => {
        return (
          <div className="w-[90%] 800px:w-[85%] m-auto mt-[70px]">
            <div className="w-full 800px:flex items-center">
              <div className=" w-full mb-[30px]">
              <h3 className={`flex justify-center font-bold text-4xl`}>
                  Lets see our students <span className="text-gradient pl-2">Reaction</span>
                </h3>
                <br />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
              {reviews &&
                  reviews.map((i, index) => 
                  <ReviewCard item={i} key={index} />)}
              </div>
          </div>
        )
      }
      
export default Reviews