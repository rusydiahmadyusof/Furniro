"use client";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const formattedSubtotal = `RM ${subtotal.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const total = subtotal;
  const formattedTotal = `RM ${total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className="bg-white rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-2xl text-black">Product</h3>
        <h3 className="font-medium text-2xl text-black">Subtotal</h3>
      </div>

      <div className="space-y-4 mb-6 pb-6 border-b border-gray-5">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-normal text-base text-gray-3">
                {item.name}
              </span>
              <span className="font-medium text-xs text-black">x</span>
              <span className="font-medium text-xs text-black">{item.quantity}</span>
            </div>
            <span className="font-light text-base text-black">{item.price}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-normal text-base text-black">Subtotal</span>
          <span className="font-light text-base text-black">{formattedSubtotal}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-normal text-base text-black">Total</span>
          <span className="font-bold text-2xl text-primary">{formattedTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

