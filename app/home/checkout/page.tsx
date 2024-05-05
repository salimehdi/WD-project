"use client";
import React, { useRef } from 'react';
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
        <div className="h-[94vh] w-full bg-slate-600 md:w-[55%] "></div>
      </div>
    );
}