import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import Responder from "@/lib/models/Responder";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// GET method for fetching a specific responder by ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { responderId: string } }
) => {
  try {
    await connectToDB();

    const responder = await Responder.findById(params.responderId).populate({
      path: "product",
      model: Product,
    });

    if (!responder) {
      return new NextResponse(
        JSON.stringify({ message: "Responder not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(responder), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.error("[responderId_GET] Error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// POST method for updating a specific responder by ID
export const POST = async (
  req: NextRequest,
  { params }: { params: { responderId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const responder = await Responder.findById(params.responderId);

    if (!responder) {
      return new NextResponse(
        JSON.stringify({ message: "Responder not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      collections,
      product,
      quantity,
    } = await req.json();

    if (!title || !description || !collections || !product || !quantity) {
      return new NextResponse("Not enough data to update the responder", {
        status: 400,
      });
    }

    const updatedResponder = await Responder.findByIdAndUpdate(
      responder._id,
      {
        title,
        description,
        collections,
        product,
        quantity,
      },
      { new: true }
    ).populate({ path: "product", model: Product });

    // Update products
    if (product) {
      const currentProducts = new Set<string>(responder.product.map((p: string) => p.toString()));
      const newProducts = new Set<string>(product);

      // Products to be added
      const addedProducts = Array.from(newProducts).filter((p: string) => !currentProducts.has(p));
      // Products to be removed
      const removedProducts = Array.from(currentProducts).filter((p: string) => !newProducts.has(p));

      await Promise.all([
        ...addedProducts.map((productId: string) =>
          Product.findByIdAndUpdate(productId, {
            $push: { responders: responder._id },
          })
        ),
        ...removedProducts.map((productId: string) =>
          Product.findByIdAndUpdate(productId, {
            $pull: { responders: responder._id },
          })
        ),
      ]);
    }

    await updatedResponder.save();

    return NextResponse.json(updatedResponder, { status: 200 });
  } catch (err) {
    console.error("[responderId_POST] Error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// DELETE method for deleting a specific responder by ID
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { responderId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const responder = await Responder.findById(params.responderId);

    if (!responder) {
      return new NextResponse(
        JSON.stringify({ message: "Responder not found" }),
        { status: 404 }
      );
    }

    await Responder.findByIdAndDelete(responder._id);

    // Update products
    await Promise.all(
      responder.product.map((productId: string) =>
        Product.findByIdAndUpdate(productId, {
          $pull: { responders: responder._id },
        })
      )
    );

    return new NextResponse(JSON.stringify({ message: "Responder deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.error("[responderId_DELETE] Error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
