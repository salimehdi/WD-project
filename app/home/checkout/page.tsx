"use client";
import React, { useRef, useState, useEffect } from 'react';
import Quagga from "quagga";

export default function Page() {
 const videoRef = useRef(null);
 const [scannedBarcode, setScannedBarcode] = useState(null);

 useEffect(() => {
    const initQuagga = async () => {
      try {
        await Quagga.init({
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: videoRef.current,
            constraints: {
              facingMode: 'environment', // Use rear camera if available
            },
          },
          decoder: {
            readers: ['ean_reader'], // Specify the barcode type (EAN-13 in this case)
          },
        }, (err) => {
          if (err) {
            console.error('Error initializing Quagga:', err);
            return;
          }
          Quagga.start();
        });

        Quagga.onDetected((result) => {
          setScannedBarcode(result.codeResult.code);
          Quagga.stop();
        });
      } catch (error) {
        console.error('Error initializing Quagga:', error);
      }
    };

    if (videoRef.current) {
      initQuagga();
    }

    return () => {
      Quagga.stop();
    };
 }, []);

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
            <div className="flex flex-col justify-center items-center w-[80%] h-[130px] rounded-lg bg-blue-100 overflow-hidden pt-8">
              <p className="absolute text-blue-800 rounded-br-lg bg-blue-300 p-2 text-2xl font-bold top-0 left-0">
                Scanned Barcode: {scannedBarcode}
              </p>
            </div>
          )}
          <button className="bg-blue-600 text-white p-3 rounded-lg text-xl">Scan</button>
        </div>
      </div>
      <div className="h-[94vh] w-full bg-slate-600 md:w-[55%]"></div>
    </div>
 );
}