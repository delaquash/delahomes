import React from 'react';
import { BiBorderLeft } from 'react-icons/bi';

type Props = {
    open: boolean;
    value? : number
}

const DashboardWidget = ({open, value}: Props) => {
  return (
    <div className='mt-[30px] min-h-screen'>
        <div className="grid grid-cols-[75%, 25%]">
            <div className="p-8">
                {/* <UserAnalytics isDashboard={true} /> */}
            </div>

            <div className="pt-[80px] pr-8">
                <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
                    <div className="flex items-center p-5 justify-between">
                        <div className="">
                            <BiBorderLeft />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardWidget