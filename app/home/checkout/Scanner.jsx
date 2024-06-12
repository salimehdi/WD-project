import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const Scanner = ({ onDetected }) => {
  const scannerRef = useRef(null);
  const init = () => {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ["code_128_reader"]
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
  }
  useEffect(() => {
    init()

    Quagga.onDetected(onDetected);

    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  }, [onDetected]);

  return <div id="interactive" className="viewport" ref={scannerRef} />;
};

export default Scanner;
