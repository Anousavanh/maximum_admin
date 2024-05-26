import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import ProductScreen from "@/lib/models/ProductScreen";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productscreenId: string } }
) => {
  try {
    await connectToDB();

    const productscreen = await ProductScreen.findById(params.productscreenId);

    if (!productscreen) {
      return new NextResponse(
        JSON.stringify({ message: "ProductScreen not found" }),
        { status: 404 }
      );
    }
    
    return NextResponse.json(productscreen, { status: 200 });
  } catch (err) {
    console.log("[productscreenId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productscreenId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let productscreen = await ProductScreen.findById(params.productscreenId);

    if (!productscreen) {
      return new NextResponse("ProductScreen not found", { status: 404 });
    }

    const { title, description, media1, media2, sizes, colors } =
      await req.json();

    if (!title || !media1 || !media2 || !sizes || !colors) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    productscreen = await ProductScreen.findByIdAndUpdate(
      params.productscreenId,
      { title, description, media1, media2, sizes, colors },
      { new: true }
    );

    await productscreen.save();

    return NextResponse.json(productscreen, { status: 200 });
  } catch (err) {
    console.log("[productscreenId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productscreenId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await ProductScreen.findByIdAndDelete(params.productscreenId);

    return new NextResponse("ProductScreen is deleted", { status: 200 });
  } catch (err) {
    console.log("[productscreenId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
