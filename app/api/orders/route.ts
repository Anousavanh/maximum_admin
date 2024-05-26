import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const orders = await Order.find().sort({ createdAt: "desc" });

    if (orders.length === 0) {
      console.log("No orders found in the database");
    }

    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const customer = await Customer.findById(order.customerId);
        return {
          _id: order._id,
          customer: customer ? customer.name : "Unknown",
          products: order.items.length,
          total: order.total,
          createdAt: format(order.createdAt, "MMM do, yyyy"),
        };
      })
    );

    console.log("Fetched Orders with Details:", orderDetails);

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.log("[orders_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";