import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import ProductScreen from "@/lib/models/ProductScreen";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { title, description, media1, media2, sizes, colors } =
      await req.json();

    // Check if a product screen with the same title already exists
    const existingProductScreen = await ProductScreen.findOne({ title });

    if (existingProductScreen) {
      // If it exists, return a response indicating the conflict
      return new NextResponse("ProductScreen with the same title already exists", { status: 409 });
    }

    if (!title || !media1 || !media2 || !sizes || !colors) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    const newProductScreen = await ProductScreen.create({
      title,
      description,
      media1,
      media2,
      sizes,
      colors,
    });

    await newProductScreen.save();

    return NextResponse.json(newProductScreen, { status: 200 });
  } catch (err) {
    console.log("[ProductScreens_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await ProductScreen.find()
      .sort({ createdAt: "desc" })

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
