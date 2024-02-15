import { BsTwitterX } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import { useState } from 'react'

const Footer = () => {

  const [isMobile, setIsMobile] = useState(window.screen.width < 720)

  return(
    <div style={{ paddingRight: isMobile ? 64 : 512, paddingLeft: isMobile ? 64 : 512 }} className='pb-24 pt-32 bg-[#fafafa] w-screen flex justify-between'>
      <h2 style={{ color: 'gray' }} className={'mt-2 text-1xl font-regular font-p'} >© 2023 - Made with ♥ by <span className='text-[orange]' >albedim</span></h2>
      <div className='justify-around flex'>
        <div className='p-4'><a target='_blank' href="https://twitter.com/TheAlbeDim"><BsTwitterX size={24} color='gray' /></a></div>
        <div className='p-4'><a target='_blank' href="https://github.com/albedim"><AiFillGithub size={24} color='gray' /></a></div>
        <div className='p-4'><a target='_blank' href="https://linkedin.com/in/alberto-di-maio-520531285"><AiFillLinkedin size={24} color='gray' /></a></div>
      </div>
    </div>
  )
}

export default Footer