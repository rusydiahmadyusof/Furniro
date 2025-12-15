"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const ORDERS_STORAGE_KEY = "furniro_orders";

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedOrders = JSON.parse(
          localStorage.getItem(ORDERS_STORAGE_KEY) || "[]"
        );
        setOrders(storedOrders.reverse()); // Show newest first
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroBanner
        title="My Orders"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Orders" },
        ]}
      />

      <section className="py-16 md:py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-3 text-base">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-black">
                        Order #{order.id || `ORD-${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-3 mt-1">
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : "Date not available"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-black">
                        RM {order.total?.toFixed(2) || "0.00"}
                      </p>
                      <p className="text-sm text-gray-3">Total</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-5 pt-4">
                    <h4 className="font-medium text-base text-black mb-2">Items:</h4>
                    <ul className="space-y-2">
                      {order.items?.map((item: any, itemIndex: number) => (
                        <li
                          key={itemIndex}
                          className="flex justify-between text-sm text-gray-3"
                        >
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

