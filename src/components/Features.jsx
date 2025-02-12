import EcosystemIcon from './SVG/Ecosystem'

const features = [
    {
        title: 'Feature 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptas ipsum facere, placeat repellendus deserunt quia error animi quae praesentium!',
    },
    {
        title: 'Feature 2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptas ipsum facere, placeat repellendus deserunt quia error animi quae praesentium!',
    },
    {
        title: 'Feature 3',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptas ipsum facere, placeat repellendus deserunt quia error animi quae praesentium!',
    }
]

function Features() {
  return (
    <div className='bg-black text-white py-[72px]'>
        <div className='container'> 
            <h2 className='text-center font-bold text-5xl sm:text-6xl tracking-tighter'>Everything you need</h2>
            <div className='max-w-xl mx-auto'>
            <p className='text-center text-xl mt-5 sm:mt-8 text-white/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptas ipsum facere, placeat repellendus deserunt quia error animi quae praesentium!</p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 mt-16'>
                {features.map(({ title, description }, index) => (
                    <div key={index} className='border border-white/30 px-5 py-10 text-center rounded-xl flex-1'>
                        <div className='inline-flex h-14 w-14 bg-white text-black justify-center items-center rounded-lg'>
                            <EcosystemIcon />                                                            
                        </div>
                        <h3 className='mt-6 font-bold'>{title}</h3>
                        <p className='mt-2 text-white/70 '>{description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Features