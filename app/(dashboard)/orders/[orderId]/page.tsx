"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns"; // Adjust import path as necessary
import { OrderType, UserType } from "@/lib/types"; // Import the types

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [orderDetails, setOrderDetails] = useState<OrderType | null>(null);
  const [customer, setCustomer] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const fetchOrderDetails = async () => {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) {
          console.error("Failed to load order details");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setOrderDetails(data.orderDetails);
        setCustomer(data.customer);
        setLoading(false);
      };

      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails || !customer) {
    return <div>Order not found</div>;
  }

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{customer.clerkId}</span> {/* Use clerkId or add a name field */}
      </p>
      <p className="text-base-bold">
        Total Paid: <span className="text-base-medium">${orderDetails.total}</span>
      </p>
      <DataTable columns={columns} data={orderDetails.items} searchKey="product" />
    </div>
  );
};

export default OrderDetails;
