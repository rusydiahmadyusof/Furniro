"use client";

interface CartTotalsProps {
  subtotal: number;
  onCheckout?: () => void;
}

const CartTotals = ({ subtotal, onCheckout }: CartTotalsProps) => {
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
    <div className="bg-[#f9f1e7] rounded-lg p-8 h-fit">
      <h2 className="font-semibold text-3xl text-black mb-8">Cart Totals</h2>

      <div className="space-y-6 mb-8">
        <div className="flex justify-between items-center">
          <p className="font-medium text-base text-black">Subtotal</p>
          <p className="font-normal text-base text-gray-3">{formattedSubtotal}</p>
        </div>

        <div className="flex justify-between items-center border-t border-gray-5 pt-6">
          <p className="font-medium text-base text-black">Total</p>
          <p className="font-medium text-xl text-primary">{formattedTotal}</p>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full border-2 border-black rounded-[15px] py-4 font-semibold text-xl text-black hover:bg-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        Check Out
      </button>
    </div>
  );
};

export default CartTotals;

