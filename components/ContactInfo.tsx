"use client";

import LocationIcon from "./icons/LocationIcon";
import PhoneIcon from "./icons/PhoneIcon";
import ClockIcon from "./icons/ClockIcon";

const ContactInfo = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="space-y-12">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 text-primary flex items-center justify-center">
              <LocationIcon />
            </div>
            <h3 className="font-medium text-2xl text-black">Address</h3>
          </div>
          <p className="font-normal text-base text-black ml-12">
            Lot 123, Jalan Bukit Bintang, 55100 Kuala Lumpur, Malaysia
          </p>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 text-primary flex items-center justify-center">
              <PhoneIcon />
            </div>
            <h3 className="font-medium text-2xl text-black">Phone</h3>
          </div>
          <div className="font-normal text-base text-black ml-12 space-y-1">
            <p>Mobile: +(84) 546-6789</p>
            <p>Hotline: +(84) 456-6789</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 text-primary flex items-center justify-center">
              <ClockIcon />
            </div>
            <h3 className="font-medium text-2xl text-black">Working Time</h3>
          </div>
          <div className="font-normal text-base text-black ml-12 space-y-1">
            <p>Monday-Friday: 9:00 - 22:00</p>
            <p>Saturday-Sunday: 9:00 - 21:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

