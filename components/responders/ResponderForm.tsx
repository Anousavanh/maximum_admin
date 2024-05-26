"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import Loader from "../custom ui/Loader";
import MultiSelectProduct from "../custom ui/MultiSelectProduct";
import MultiSelectScreen from "../custom ui/MultiSelectScreen";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  collection: z.array(z.string()),
  product: z.array(z.string()),
  quantity: z.string(),
});

interface ResponderFormProps {
  initialData?: ResponderType | null; // Must have "?" to make it optional
}

const ProductScreenForm: React.FC<ResponderFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productscreens, setProductScreens] = useState<ProductScreenType[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, productScreenRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/productscreens"),
        ]);

        const productData = await productRes.json();
        const productScreenData = await productScreenRes.json();

        setProducts(productData);
        setProductScreens(productScreenData);
        setLoading(false);
      } catch (err) {
        console.log("[Fetch Error]", err);
        toast.error("Something went wrong! Please try again.");
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          collection: [initialData.collection],
          product: initialData.product.map((product) => product.toString()),
        }
      : {
          title: "",
          description: "",
          collection: [],
          product: [],
          quantity: "",
        },
  });

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const dataToSend = {
        ...values,
        collection: [selectedCollection],
      };

      const url = initialData
        ? `/api/responders/${initialData._id}`
        : "/api/responders";
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        toast.success(`Responders ${initialData ? "updated" : "created"}`);
        router.push("/responders");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      console.log("[responders_POST]", err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Responders</p>
          <Delete id={initialData._id} item="product" />
        </div>
      ) : (
        <p className="text-heading2-bold">Add Responders</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="flex gap-10">
            <Button
              type="button"
              className=" bg-black-1 text-white "
              onClick={() => setSelectedCollection("product")}
            >
              Product
            </Button>
            <Button
              type="button"
              onClick={() => setSelectedCollection("screenproduct")}
              className="bg-black-1 text-white"
            >
              Screen Product
            </Button>
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
            {selectedCollection === "product" && (
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Products</FormLabel>
                    <FormControl>
                      <MultiSelectProduct
                        placeholder="Products"
                        products={products}
                        value={field.value}
                        onChange={(_id) =>
                          field.onChange([...field.value, _id])
                        }
                        onRemove={(idToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (productId) => productId !== idToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />
            )}

            {selectedCollection === "screenproduct" && (
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Screen</FormLabel>
                    <FormControl>
                      <MultiSelectScreen
                        placeholder="Product Screen"
                        productscreen={productscreens}
                        value={field.value}
                        onChange={(_id) =>
                          field.onChange([...field.value, _id])
                        }
                        onRemove={(idToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (productscreenId) =>
                                productscreenId !== idToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Quantity"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white" disabled={loading}>
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/responders")}
              className="bg-black-1 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductScreenForm;
