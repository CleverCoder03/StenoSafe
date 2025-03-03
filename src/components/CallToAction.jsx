import helixImage from '../assets/helix2.png'
import emojiStar from '../assets/emojistar.png'
import Image from 'next/image'

function CallToAction() {
  return (
    <div className='bg-black text-white py-[72px] sm:py-24 text-center overflow-x-hidden'>
        <div className='container max-w-xl relative'>
            <Image src={helixImage} alt='Helix' className='absolute top-6 left-[calc(100%+24px)] '/>
            <Image src={emojiStar} alt='Emoji Star' className='absolute -top-[100px] right-[calc(100%+24px)]'/> 
            <h2 className='text-5xl tracking-tighter font-bold sm:text-6xl'>
                Want to join us?
            </h2>
            <p className='text-xl text-white/70 mt-5'>
            If you’re passionate about privacy, encryption, and cutting-edge technology, join our team and help shape StenoSafe.
            </p>
            {/* <form action="" className='mt-10 flex flex-col gap-2.5 max-w-sm mx-auto sm:flex-row'>
                <input type="email" placeholder='your@email.com' className='h-12 bg-white/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] sm:flex-1'/>
                <button className='h-12 bg-white text-black rounded-lg px-5 font-medium'>Get Access</button>
            </form> */}
            <div className='mt-4'>
                <a href="mailto:clevercoder0307@gmail.com">
                <button className='h-12 bg-white text-black rounded-lg px-5 font-medium'>Let's go 🚀</button>
                </a>
            </div>
        </div>
    </div>
  )
}

export default CallToAction