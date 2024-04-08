
import Table from '../../ui/checkout/table';
export default function Page() {
    const customersData = [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          image_url: "/public/customers/amy-burns.png",
          total_invoices: 10,
          total_pending: "5",
          total_paid: "5",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          image_url: "/images/jane-smith.jpg",
          total_invoices: 15,
          total_pending: "8",
          total_paid: "7",
        },
        // Add more customer objects as needed
      ];
    return <Table customers={[...customersData]} />;
}