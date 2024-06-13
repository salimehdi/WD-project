"use client";
import React, { useEffect, useRef, useState } from 'react';

// Quagga is written in js and not in ts, thts y there is no type/module for it
import Quagga from 'quagga';
import "./bill.css";

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
}

interface DetectedResult {
  codeResult: {
    code: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ name, price, quantity }) => (
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

const Page: React.FC = () => {
  const videoRef = useRef<any>(null);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [sum, setSum] = useState<number>(0);

  const onDetected = (result: DetectedResult) => {
    console.log("Detected barcode:", result.codeResult.code); // Debugging line
    setScannedBarcode(result.codeResult.code);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: videoRef.current 
        },
        decoder: {
          readers: ["code_128_reader"]
        }
      }, (err: any) => {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
        Quagga.onDetected(onDetected);
      });

    } catch (error) {
      console.error('Error accessing camera:', error);
    }

    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  };

  useEffect(() => {
    let sum1 = 0;
    cartItems.forEach((e) => {
      sum1 += e.price;
    });
    setSum(sum1);
  }, [cartItems]);

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
            {scannedBarcode && (
              <div className="flex flex-col justify-center items-center w-[80%] h-[130px] rounded-lg bg-blue-100 overflow-hidden pt-8 relative">
                <p className="absolute text-blue-800 rounded-br-lg bg-blue-300 p-2 text-2xl font-bold top-0 left-0"> SG Cricket Bat
                </p>
                <div className='text-xl flex justify-center items-center gap-5'>
                  <p>Brand: SG</p>
                  <p>Price: 600</p>
                </div>
                <div className='text-xl flex justify-center items-center gap-5'>
                  <p>Quantity: 5</p>
                </div>
              </div>
            )}
            <input type="text" value={scannedBarcode || ''} onChange={(e) => { setScannedBarcode(e.target.value) }} />
            {
              scannedBarcode !== null
                ? <button
                  onClick={() => {
                    setCartItems([...cartItems, {
                      name: "SG Cricket Bat",
                      price: 600,
                      quantity: 5
                    }]);
                  }}
                  className="bg-blue-600 text-white p-3 rounded-lg text-xl">Add</button>
                : <button className="bg-blue-600 text-white p-3 rounded-lg text-xl">Scan</button>
            }

          </div>
        </div>
        <div className="h-[94vh] w-full bg-slate-100 md:w-[55%] relative flex flex-col">
          <div className="items overflow-x-auto max-h-[94vh]">
            {
              cartItems.length > 0 && cartItems.map((e, index) => (
                <CartItem key={index} name={e.name} price={e.price} quantity={e.quantity} />
              ))
            }
          </div>
          <div className="checkout text-center mt-auto">
            <button onClick={() => {
              setCartItems([]);
              setScannedBarcode(null);
            }} className="bg-green-500 text-center text-white p-3 rounded-lg text-xl">Checkout</button>
            <div className="bill w-[80%] mx-auto ">
              <div className="bill-line">
                <div className="item-name">Total Price:</div>
                <div className="price">{sum} ₹</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Page; 