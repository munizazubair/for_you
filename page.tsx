"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProductI {
  title: string;
  content: string;
  quantity: number;
}

export default function Blog() {
  const [data, setData] = useState<ProductI[]>([]); //api se data arha he
  const [cart, setCart] = useState<ProductI[]>([]);//cart main jo data store hoga

  useEffect(() => {
    async function fetchData() {
      let Products = await (await fetch("http://localhost:3000/api/product")).json();
      setData(Products);
    }
    fetchData();

    // Get cart data from localStorage once on mount
    // const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    // setCart(storedCart);
  }, []);

  // Add to Cart functionality
  const addToCart = (product: ProductI) => {
    const cartCopy = [...cart];
    const existingProduct = cartCopy.find((item) => item.title === product.title);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      // Set initial quantity to 0
      cartCopy.push({ ...product, quantity: 0 });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartCopy));
    setCart(cartCopy); // Update state to reflect the latest cart
  };

  // Get the quantity of a product in the cart
  const getProductQuantity = (title: string) => {
    const product = cart.find((item) => item.title === title);
    return product ? product.quantity : 0;
  };

  return (
    <div className="text-red w-[100vw] h-[100vh]">
      <h1 className="text-3xl text-red-700">Blog</h1>
      {data.map((blog: any, index: number) => (
        <div key={index} className="border p-4 m-2">
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <p>Quantity in Cart: {getProductQuantity(blog.title)}</p>
          <button
            onClick={() => addToCart(blog)}
            className="bg-blue-500 text-white px-4 py-2 mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
      {/* Use Link for navigation to the Cart page */}
      <Link href="/cart2">
        <button className="bg-green-500 text-white px-4 py-2 mt-4">
          Go to Cart
        </button>
      </Link>

    
    </div>
  );
}
