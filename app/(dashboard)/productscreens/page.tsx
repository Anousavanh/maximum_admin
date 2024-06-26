"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/productscreens/ProductScreenColumns";

const ProductScreens = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [productscreens, setProductScreen] = useState<ProductScreenType[]>([]);

  const getProductScreens = async () => {
    try {
      const res = await fetch("/api/productscreens", {
        method: "GET",
      });
      const data = await res.json();
      setProductScreen(data);
      setLoading(false);
    } catch (err) {
      console.log("[productscreens_GET]", err);
    }
  };

  useEffect(() => {
    getProductScreens();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">ProductScreens</p>
        <Button
          className="bg-black-1 text-white"
          onClick={() => router.push("/productscreens/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create ProductScreens
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={productscreens} searchKey="title" />
    </div>
  );
};

export default ProductScreens;
