"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<ProductScreenType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/productscreens/${row.original._id}`}
        className="hover:text-blue-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "sizes",
    header: "Sizes",
  },
  {
    accessorKey: "colors",
    header: "Colors",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="productscreen" id={row.original._id} />,
  },
];
