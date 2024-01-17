import React from 'react'

const Footer = () => {
  return (
    <footer className='w-auto h-fit bg-slate-800'>
        <div className='w-full flex justify-center items-center flex-col'>
            <div className="w-[90%] mx-auto flex justify-center items-center flex-col md:flex-row md:items-start md:justify-evenly text-slate-500 py-4">
                <div className="flex justify-center items-center flex-col">
                    <h3 className='text-xl font-bold text-gray-500 border-b-[1px] border-gray-500'>Contact Us</h3>
                    <p>Email: contact@startsaw.org</p>
                    <p>Phone: +123 456 7890</p>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <h3 className='text-xl font-bold border-b-[1px] border-gray-500'>Explore</h3>
                    <ul className='flex justify-center items-center flex-col'>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#products">Products</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <h3 className='text-xl font-bold border-b-[1px] border-gray-500'>Connect with Us</h3>
                    {/* TODO: add icon for socials */}
                    <ul className="flex justify-center items-center flex-col">
                        <li><a href="#" target="_blank">Facebook</a></li>
                        <li><a href="#" target="_blank">Twitter</a></li>
                        <li><a href="#" target="_blank">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-gray-600 py-2 w-[95%] mx-auto border-t-[1px] border-slate-500 border-dotted flex justify-center items-center flex-col">
                <p>&copy; 2023 startSAW - Space Advancements Worldwide</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer