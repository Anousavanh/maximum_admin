// types.ts

export type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

export type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: string[];
  category: string;
  collections: string[];
  tags: string[];
  price: number;
  cost: number;
  sizes: string[];
  colors: string[];
  createdAt: string;
  updatedAt: string;
};

export type UserType = {
  clerkId: string;
  wishlist: string[];
  createdAt: string;
  updatedAt: string;
};

export type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
  _id: string;
};

export type CheckoutType = {
  name: string;
  surname: string;
  city: string;
  home: string;
  phone: string;
  media: string[];
};

export type OrderType = {
  _id: string;
  total: number;
  items: OrderItemType[];
  status: string | null;
  customerId: string;
  form: CheckoutType; // Include the form property if it exists in the order data
  createdAt: Date;
};

export type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  total: number;
  createdAt: string;
};

export type ProductScreenType = {
  _id: string;
  title: string;
  description: string;
  media1: string;
  media2: string;
  sizes: string[];
  colors: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CustomerDetails = {
  clerkId: string;
  email: string;
  fullName: string;
};

export type CheckoutPayloadType = {
  customerDetails: CustomerDetails;
  items: {
    productId: string;
    quantity: number;
  }[];
  total: number;
  form: CheckoutType;
};

export type CustomerType = {
  _id: string;
  name: string;
  email: string;
  // Add other necessary fields
};
