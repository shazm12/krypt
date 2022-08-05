import React from 'react'
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({color, title, icon, subtitle}) => (
  <div className='flex flex-row justify start items-center white-glassmorphism p-3 m-4 cursor-pointer hover:shadow-xl'>
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className='ml-5 flex flex-col flex-1'>
      <h3 className='mt-2 text-white text-lg'>{title}</h3>
      <p className="mt-2 text-white text-sm sm:w-9/12 md:w-9/12">{subtitle}</p>

    </div>
  </div>
)

const Services = () => {
  return (
    <div className='flex  flex-col md:flex-row w-full justify-center items-center gradient-bg-services'>
      <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12'>
        <div className='flex-1 flex-col justify-start items-start'>
          <h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient'>Services That we 
            <br />
            continue to provide
          </h1>
        </div>
      </div>
      <div className='flex-0.85 sm:flex-0.35 flex-col jusitfy-start items-center'>
        <ServiceCard
          color="bg-[#2952e3]"
          title="Security Guaranteed"
          icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
          subtitle="Security is Guaranteed. We always maintain prvacy and maintain quality of our products" 
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Best exchange fees"
          icon={<BiSearchAlt fontSize={21} className='text-white' />}
          subtitle="Security is Guaranteed. We always maintain prvacy and maintain quality of our products" 
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fastest Transactions"
          icon={<RiHeart2Fill fontSize={21} className='text-white' />}
          subtitle="Security is Guaranteed. We always maintain prvacy and maintain quality of our products" 
        />
      </div>
    </div>
  )
}

export default Services;