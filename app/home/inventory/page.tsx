import './header.css';

export default function Page() {
    return (
        <div className="w-[100%] h-[100%]">
            <header>
                <h1 className="p-4 text-4xl text-blue-900 opacity-50 font-bold">
                    Inventory
                    <span className="text-xl opacity-50 mx-4">{126} items listed</span>
                </h1>
                <div className="buttons">
                    <div className="ctas">
                        <button>+ Add new stock</button>
                        <button>+ Add old stock</button>
                    </div>
                </div>
                <table className='w-full h-full bg-blue-100 text-left mx-2 rounded-lg'>
                    <thead>
                        <tr className='text-blue-900 opacity-60'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Brand Name</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Item cost</th>
                            <th>Estimated price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1.</td>
                            <td>Cricket Bat Small Size</td>
                            <td>MRF bats</td>
                            <td>87 N</td>
                            <td>Low</td>
                            <td>1000 ₹</td>
                            <td>1200 ₹</td>

                        </tr>
                        <tr>
                            <td>2.</td>
                            <td>Cricket Bat Small Size</td>
                            <td>MRF bats</td>
                            <td>87 N</td>
                            <td>Out</td>
                            <td>1000 ₹</td>
                            <td>1200 ₹</td>
                        
                        </tr>
                    </tbody>
                </table>
            </header>
        </div>
    );
}