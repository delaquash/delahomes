import { styles } from '@/app/styles/style';
import React, {useState }from 'react';

type Props = {}

const onSubmitHandler = () => {}

const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[30px] 800px:text-[30px] font-Poppins text-center font-[500] pb-2 text-black dark:text-[#fff]">
          Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={onSubmitHandler} 
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your old password
            </label>
            <input 
              type='password'
              required
              className={`${styles.input} !w-[95%] mb-4 text-black dark:text-[#fff] 800px:mb-0`}
              value={oldPassword}
              onChange={(e)=>setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2">
          <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your new password
            </label>
            <input 
              type='password'
              required
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2">
          <label className="block pb-2 text-black dark:text-[#fff]">
              Please confirm your password
            </label>
            <input 
              type='password'
              required
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <input 
              className={`w-[95%] h-[40px] text-black border-[#37a39a] text-center dark:text-[#fff] rounder-[3px] mt-8 cursor-pointer`}
              required
              value="update"
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword