"use client";
import React, { useRef } from 'react';

function CartItem({name, price, quantity} : {name: string, price: number, quantity: number}) {
  return (
    <div className="item flex items-center p-4 gap-4 w-full">
      <div className="icon bg-sky-500 w-16 h-16 rounded-md"></div>
      <div className="details">
        <p>{name}</p>
        <p>Qt: {quantity} Packet</p>
      </div>
      <div className="side-data ml-auto">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="price">
          <p>{price} ₹</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const videoRef = useRef(null);

  const scannedItems = {
    name: 'Niveia Football',
    brand: 'Niveia',
    quantity: 5,
    price: 500,
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
    return (
      <div className="flex h-full w-full flex-col items-center justify-evenly gap-5 lg:flex-row">
        <div className="h-[94vh] w-full md:w-[40%] ">
          <div className='flex items-center flex-col gap-5'>
            <button className='bg-blue-700 text-white p-3 rounded-lg text-xl' onClick={startCamera}>Start Camera</button>
            <div className='relative w-[400px] h-[300px] border-black border-4 rounded-2xl overflow-hidden' style={{backgroundImage:"url(https://cdn2.iconfinder.com/data/icons/shop-retail-cartoon/512/a2089-512.png)", backgroundPosition:"center", backgroundSize:"contain", backgroundRepeat:"no-repeat"}}>
            <video
              ref={videoRef}
              width="400"
              height="300"
              autoPlay
              playsInline
            ></video>
              </div>
              <div className='flex flex-col justify-center items-center relative w-[80%] h-[130px] rounded-lg bg-blue-100 overflow-hidden pt-8'>
                <p className="absolute text-blue-800 rounded-br-lg bg-blue-300 p-2 text-2xl font-bold top-0 left-0">{scannedItems.name}</p>
                <div className="flex gap-5 justify-evenly items-center w-full">
                  <p className="text-blue-800 text-lg font-semibold">Brand: {scannedItems.brand} </p>
                  <p className="text-green-800 text-lg font-semibold">Qty Left: {scannedItems.quantity} Pcs.</p>
                </div>
                <div className="flex gap-5 justify-evenly items-center w-full">
                  <p className="text-cyan-800 text-lg font-semibold">Price: {scannedItems.price} $ </p>
                  <p className="text-blue-800 text-lg font-semibold">Quantity: 
                    <input min={0} max={scannedItems.quantity} type="number" onChange={(e)=>{
                      if (parseInt(e.target.value) > scannedItems.quantity) {
                        e.target.value = "5";
                      }
                    }} className='w-10 h-8 rounded-lg border-2 border-blue-800' />
                  </p>
                </div>
              </div>
              <button className='bg-blue-600 text-white p-3 rounded-lg text-xl' >Scan</button>
          </div>
        </div>
        <div className="h-[94vh] w-full md:w-[55%] ">
          <div className="table h-[65%] w-[80%] mx-auto bg-gray-200 rounded-lg">
            <div className="header mx-4 my-2 flex items-center justify-between px-4 py-2">
              <h3 className='text-xl'>Cart Items</h3>
              <a className="text-blue-700 cursor-pointer">See all</a>
            </div>
            <div className="item-list">
              {/* Call from API */}
              <CartItem name="Tata Salt" price={1200} quantity={10} />
            </div>
          </div>
        </div>
      </div>
    );
}