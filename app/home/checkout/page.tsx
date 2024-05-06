"use client";
import React, { useRef , useState } from 'react';

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
 const [scannedBarcode, setScannedBarcode] = useState(null);
 const [cartItems , setCartItems] = useState([])

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
  <>
  <div className="flex h-full w-full flex-col items-center justify-evenly gap-5 lg:flex-row">
  <div className="h-[94vh] w-full md:w-[40%]">
    <div className="flex items-center flex-col gap-5">
      <button className="bg-blue-700 text-white p-3 rounded-lg text-xl" onClick={startCamera}>
        Start Camera
      </button>
      <div
        className="relative w-[400px] h-[300px] border-black border-4 rounded-2xl overflow-hidden"
      >
        <video ref={videoRef} width="400" height="300" autoPlay playsInline></video>
      </div>
      {scannedBarcode === "6638916b9cd5d131206fd8fd" && (
        <div className="flex flex-col justify-center items-center w-[80%] h-[130px] rounded-lg bg-blue-100 overflow-hidden pt-8 relative">
          <p className="absolute text-blue-800 rounded-br-lg bg-blue-300 p-2 text-2xl font-bold top-0 left-0"> SG Cricket Bat
          </p>
          <div className='text-xl flex justify-center items-center gap-5'>
            <p>Brand: SG</p>
            <p>Price: 600</p>
          </div>
          <div className='text-xl flex justify-center items-center gap-5'>
            <p>Quantity: SG</p>
            <p>Price: 600</p>
          </div>
        </div>
      )}
      <input type="text" value={scannedBarcode} onChange={(e)=>{setScannedBarcode(e.target.value)}} />
      <button onClick={(e)=>{console.log(e.target)}} className="bg-blue-600 text-white p-3 rounded-lg text-xl">{
        scannedBarcode != "" ? "Add" : "Scan"
      }</button>
    </div>
    </div>
    <div className="h-[94vh] w-full bg-slate-100 md:w-[55%] relative ">
      {

      }
      <div className="fixed bottom-0 w-full bg-white p-4 flex items-center gap-4">Total</div>
    </div>
  </div>
  </>
      


    );
}