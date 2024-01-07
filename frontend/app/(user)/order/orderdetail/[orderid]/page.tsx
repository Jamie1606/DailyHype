// Name: Zay Yar Tun
// Admin No: 2235035
// Class: DIT/FT/2B/02

"use client";

import { useAppState } from "@/app/app-provider";
import { CurrentActivePage, URL } from "@/enums/global-enums";
import { capitaliseWord, formatDateByMonthDayYear, formatMoney } from "@/functions/formatter";
import { Divider, Image } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fetchOrderDetail = (orderid: number) => {
  return fetch(`${process.env.BACKEND_URL}/api/orderDetail/${orderid}`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export default function Page({ params }: { params: { orderid: number } }) {
  const router = useRouter();
  const { setCurrentActivePage } = useAppState();
  const { orderid } = params;
  const [orderData, setOrderData] = useState<any>(null);
  const [orderDetail, setOrderDetail] = useState<any>([]);

  useEffect(() => {
    setCurrentActivePage(CurrentActivePage.AllOrder);
    fetchOrderDetail(orderid).then((data) => {
      setOrderData(data.order);
      setOrderDetail(data.orderdetail);
    });
  }, []);

  if (!orderData) return null;

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-start items-center w-full rounded-tr-lg rounded-tl-lg bg-zinc-300 dark:bg-zinc-700 px-8 py-4">
        <label onClick={() => router.back()} className="text-small cursor-pointer text-blue-700 dark:text-blue-300">
          <span className="text-medium">&lt;</span> Back
        </label>
        <label className="text-small ms-auto">Order #{orderid}</label>
        <label className="ms-4"> | </label>
        <label className="text-small ms-4">{capitaliseWord(orderData.orderstatus)}</label>
      </div>
      <div className="border-1 pt-4">
        {orderDetail.map((item: any, index: number) => {
          return (
            <div key={index} className="flex px-4 mb-4 items-start">
              <Image src={item.image} alt={item.productname} radius="lg" className="border-1 w-[80px] h-[100px]" />
              <div className="flex flex-col ml-4">
                <Link href="" className="text-black mt-1 dark:text-white text-medium cursor-pointer">
                  {item.productname}
                </Link>
                <label className="text-small mt-3 text-slate-600 dark:text-slate-400">
                  Color: {capitaliseWord(item.colour)}, Size: {item.size}
                </label>
                <label className="mt-2 text-small">x{item.qty}</label>
              </div>
              <label className="ms-auto self-center mr-3">${formatMoney(item.unitprice)}</label>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-between px-4 pt-4">
        <div className="flex flex-col basis-[50%] mr-4 border-r-1 ms-4">
          <label className="font-semibold text-lg">Order Information</label>
          <div className="flex justify-start mt-4">
            <div className="flex flex-col">
              <label className="text-sm mb-2">Order ID:</label>
              <label className="text-sm mb-2">Order Date:</label>
              <label className="text-sm mb-2">Delivery Address:</label>
            </div>
            <div className="flex flex-col ms-12">
              <label className="text-sm mb-2">{orderid}</label>
              <label className="text-sm mb-2">{formatDateByMonthDayYear(orderData.createdat)}</label>
              <label className="text-sm mb-2">{orderData.deliveryaddress}</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col basis-[40%] mr-4">
          <label className="text-left text-lg font-semibold">Summary</label>
          <div className="flex justify-between w-full mt-4">
            <div className="flex flex-col">
              <label className="text-sm mb-2">Merchandise SubTotal:</label>
              <label className="text-sm mb-2">Shipping Fee:</label>
              <label className="text-sm mb-2">Discount:</label>
              <label className="text-md mb-2 mt-2">Total:</label>
            </div>
            <div className="flex flex-col text-right">
              <label className="text-sm mb-2">$40.00</label>
              <label className="text-sm mb-2">$1.00</label>
              <label className="text-sm mb-2">-$1.00</label>
              <label className="text-md font-bold mb-2 mt-2">${formatMoney(orderData.totalamount)}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
