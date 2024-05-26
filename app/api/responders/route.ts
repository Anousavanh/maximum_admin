import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import Responder from '@/lib/models/Responder';
import Product from '@/lib/models/Product';

// POST method for creating a new responder
export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const {
      title,
      description,
      collections,
      product,
      quantity,
    } = await req.json();

    if (!title || !description || !product || !quantity) {
      return new NextResponse("Not enough data to create a Responder", { status: 400 });
    }

    const newResponder = new Responder({
      title,
      description,
      collections: collections || [],
      product: product || [],
      quantity,
    });

    await newResponder.save();

    if (product) {
      for (const productId of product) {
        const productItem = await Product.findById(productId);
        if (productItem) {
          productItem.responders = productItem.responders || [];
          productItem.responders.push(newResponder._id);
          await productItem.save();
        }
      }
    }

    return NextResponse.json(newResponder, { status: 200 });
  } catch (err) {
    console.error("[Responder_POST] Error:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

// GET method for retrieving all responders
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const responders = await Responder.find()
      .sort({ createdAt: 'desc' })
      .populate({ path: 'product', model: Product });

    return NextResponse.json(responders, { status: 200 });
  } catch (err) {
    console.error('[Responders_GET] Error:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
