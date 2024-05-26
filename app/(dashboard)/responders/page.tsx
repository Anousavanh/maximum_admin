"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/responders/ResponderColumns";

const Responders = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [responders, setResponders] = useState<ResponderType[]>([]);

  const getResponders = async () => {
    try {
      const res = await fetch("/api/responders", {
        method: "GET",
      });
      const data = await res.json();
      console.log('Fetched Responders:', data); // Debugging log
      setResponders(data);
      setLoading(false);
    } catch (err) {
      console.log("[responders_GET]", err);
    }
  };

  useEffect(() => {
    getResponders();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Responders</p>
        <Button className="bg-black-1 text-white" onClick={() => router.push("/responders/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Responder
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={responders} searchKey="title" />
    </div>
  );
};

export default Responders;
