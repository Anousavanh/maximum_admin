import Responder from "@/lib/models/Responder";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { responderId: string } }
) => {
  try {
    await connectToDB();

    const responder = await Responder.findById(params.responderId);

    if (!responder) {
      return new NextResponse(
        JSON.stringify({ message: "Responder not found" }),
        { status: 404 }
      );
    }

    const relatedResponders = await Responder.find({
      $or: [
        { collections: { $in: responder.collections } },
        { product: { $in: responder.product } },
      ],
      _id: { $ne: responder._id }, // Exclude the current responder
    }).populate({ path: "product", model: Product });

    if (relatedResponders.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No related responders found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(relatedResponders, { status: 200 });
  } catch (err) {
    console.error("[related_GET] Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
