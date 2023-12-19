"use client";

import { useAppState } from "@/app/app-provider";
import { useEffect } from "react";

export default function Product() {
  const { token, setCurrentActivePage } = useAppState();

  useEffect(() => {
    setCurrentActivePage("none");
  }, []);

  return <div>This is admin dashboard page!</div>;
}