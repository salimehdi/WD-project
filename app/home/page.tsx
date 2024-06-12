"use client";
import Link from 'next/link';
import Chart from '../ui/home/chart'
export default function Page() {
    return (
        <>
    <Chart/>

    <div className="w-[100%] flex md:flex-row flex-col mt-10 justify-center items-center gap-10">
    <div className=" w-[250px] bg-blue-800 text-cyan-100 rounded-lg h-[120px] relative flex justify-center items-center pt-6 text-5xl">
            <div className="absolute top-3 left-3 text-white text-xl bg-opacity-50 rounded-lg flex justify-center items-center">
                Yesterdays Profit:
            </div>
            <b>5,196 ₹</b>
        </div>
        <div className=" w-[250px] bg-blue-800 text-cyan-100 rounded-lg h-[120px] relative flex justify-center items-center pt-6 text-5xl">
            <div className="absolute top-3 left-3 text-white text-xl bg-opacity-50 rounded-lg flex justify-center items-center">
                Todays Profit:
            </div>
            <b>4,457 ₹</b>
        </div>
    </div>

<section className="py-1 bg-blueGray-50">
<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-10">
  <div className="relative flex flex-col min-w-0 break-words bg-blue-50 w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">Top Selling: </h3>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <Link href="/home/inventory">
          <button style={{backgroundColor:"rgb(99 102 241)"}} className="bg-indigo-500 text-white hover:bg-indigo-700 hover:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >See all</button>
          </Link>
        </div>
      </div>
    </div>

    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Name
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Brand Name
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Quantity
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Selling Price
                        </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
              SG Cricket
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              SG
            </td>
            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              4
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
              600
            </td>
          </tr>
          <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
            Ramp Swimming Earpods
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
            Ramp
            </td>
            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            6
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
              900
            </td>
          </tr>
          <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
            Great Dumbell
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              Great
            </td>
            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              5
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
              900
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</div>

</section>

        </>
    
);
}