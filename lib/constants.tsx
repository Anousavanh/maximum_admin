import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    url: "/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/productscreens",
    icon: <Tag />,
    label: "ProductScreens",
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/screensorders",
    icon: <ShoppingBag />,
    label: "ScreenOrders",
  },
  {
    url: "/responders",
    icon: <UsersRound />,
    label: "Responder",
  },
  {
    url: "/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
];
