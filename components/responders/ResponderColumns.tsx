"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<ResponderType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/responders/${row.original._id}`}
        className="hover:text-blue-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <div>
        {row.original.product.map((product: ProductType) => (
          <span key={product._id} className="block">
            {product.title}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="responder" id={row.original._id} />,
  },
];
