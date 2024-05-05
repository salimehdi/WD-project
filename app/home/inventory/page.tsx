"use client";
import AddNewItemButton from '@/app/ui/inventory/AddNewItem';
import './header.css';
import { useEffect, useState } from 'react';

interface Item {
	_id: string;
	productName: string;
	brandName: string;
	quantity: number;
	buyingPrice: number;
	maxSellingPrice: number;
	barcode: number;
  }


export default function Page() {

    const [toAddNewItems , setToAddNewItems] = useState(false);
    const [toAddOldItems , setToAddOldItems] = useState(false);

	const [items, setItems] = useState<Item[]>([])

	useEffect(() => {
		if(toAddNewItems === false){

			fetch('/api/product')
				.then(res => res.json())
				.then(data => {
					setItems(data.message)
					console.log(data.message)
				})
		}

	}, [toAddNewItems])

    return (
        <div className="w-[100%] h-[100%]">
            <header>
                <h1 className="p-4 text-4xl text-blue-900 opacity-50 font-bold">
                    Inventory
                    <span className="text-xl opacity-50 mx-4">{126} items listed</span>
                </h1>
                <div className="buttons">
                    <div className="ctas">
                        < AddNewItemButton setter={(e)=>{
							setToAddNewItems(e)
						}} />
                        {
                            toAddOldItems 
                            ? (<button style={{backgroundColor:"green"}} onClick={()=>setToAddOldItems(false)}>&#x2713; Done</button>)

                           :(<button onClick={()=>setToAddOldItems(true)}>+ Add Old Item</button>)
                        }
                        
                    </div>
                </div>
                







<div className="w-[95%] mx-auto">

	<div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
		<div className="p-4">
		
			</div>
			<table className="w-full text-sm text-left text-gray-500 ">
				<thead className="text-xs text-gray-700 uppercase bg-blue-200">
					<tr>
					
                        
						<th scope="col" className="px-10 py-3">
                        #
						</th>
						<th scope="col" className="px-10 py-3">
							Name
						</th>
						<th scope="col" className="px-10 py-3">
							Brand Name
						</th>
						<th scope="col" className="px-10 py-3">
							Quantity
						</th>
						<th scope="col" className="px-10 py-3">
							Buying Cost
						</th>
						<th scope="col" className="px-10 py-3">
							Selling Price
						</th>
						<th scope="col" className="px-5 py-3">
							
						</th>
					</tr>
				</thead>
				<tbody>
					{
						items && items.map((item, index) => (
							<tr
							onClick={async()=> await navigator.clipboard.writeText(item.barcode.toString())}
								key={item._id}
								className="bg-blue-100 border-b hover:bg-blue-50 ">
								<th scope="row" className="px-10 py-4">
									{index + 1}
								</th>
								<td className="px-10 py-4">
									{item.productName}
								</td>
								<td className="px-10 py-4">
									{item.brandName}
								</td>
								<td className="px-10 py-4">
									{item.quantity}
								</td>
								<td className="px-10 py-4">
									{item.buyingPrice}
								</td>
								<td className="px-10 py-4">
									{item.maxSellingPrice}
								</td>
								<td className="px-5 py-4 flex gap-3 text-white">
									{
										toAddOldItems && 
										(
										<><div className='bg-blue-700 rounded-lg w-5 h-5 flex justify-center items-center'>-</div>
									<input type="number" className='w-5 h-5 text-center' value='1'/>
									<div className='bg-blue-700 rounded-lg w-5 h-5 flex justify-center items-center'>+</div>
									</>)
									}
									
								</td>
							</tr>
						))
					}
				
				</tbody>
			</table>
		</div>

	</div>




            </header>

            
        </div>
    );
}
