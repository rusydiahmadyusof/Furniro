'use client';

import { useState } from 'react';
import { useToast } from './ToastProvider';

interface BillingDetailsFormProps {
  onSubmit?: (data: BillingFormData) => void;
}

export interface BillingFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo: string;
}

const BillingDetailsForm = ({ onSubmit }: BillingDetailsFormProps) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<BillingFormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Malaysia',
    streetAddress: '',
    townCity: '',
    province: 'Kuala Lumpur',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='bg-white rounded-lg p-8'>
      <h2 className='font-semibold text-4xl text-black mb-8'>
        Billing details
      </h2>

      <form className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='firstName'
              className='block font-medium text-base text-black mb-2'
            >
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors placeholder:text-gray-3'
            />
          </div>

          <div>
            <label
              htmlFor='lastName'
              className='block font-medium text-base text-black mb-2'
            >
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors placeholder:text-gray-3'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='companyName'
            className='block font-medium text-base text-black mb-2'
          >
            Company Name (Optional)
          </label>
          <input
            type='text'
            id='companyName'
            name='companyName'
            value={formData.companyName}
            onChange={handleChange}
            className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors'
          />
        </div>

        <div>
          <label
            htmlFor='country'
            className='block font-medium text-base text-black mb-2'
          >
            Country / Region
          </label>
          <div className='relative'>
            <select
              id='country'
              name='country'
              value={formData.country}
              onChange={handleChange}
              className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors appearance-none bg-white cursor-pointer'
            >
              <option value='Malaysia'>Malaysia</option>
              <option value='Singapore'>Singapore</option>
              <option value='Thailand'>Thailand</option>
              <option value='Indonesia'>Indonesia</option>
            </select>
            <div className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                className='text-gray-3'
              >
                <path
                  d='M7 10L12 15L17 10'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor='streetAddress'
            className='block font-medium text-base text-black mb-2'
          >
            Street address
          </label>
          <input
            type='text'
            id='streetAddress'
            name='streetAddress'
            value={formData.streetAddress}
            onChange={handleChange}
            className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors'
          />
        </div>

        <div>
          <label
            htmlFor='townCity'
            className='block font-medium text-base text-black mb-2'
          >
            Town / City
          </label>
          <input
            type='text'
            id='townCity'
            name='townCity'
            value={formData.townCity}
            onChange={handleChange}
            className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors'
          />
        </div>

        <div>
          <label
            htmlFor='province'
            className='block font-medium text-base text-black mb-2'
          >
            State
          </label>
          <div className='relative'>
            <select
              id='province'
              name='province'
              value={formData.province}
              onChange={handleChange}
              className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors appearance-none bg-white cursor-pointer'
            >
              <option value='Kuala Lumpur'>Kuala Lumpur</option>
              <option value='Selangor'>Selangor</option>
              <option value='Johor'>Johor</option>
              <option value='Penang'>Penang</option>
              <option value='Sabah'>Sabah</option>
              <option value='Sarawak'>Sarawak</option>
              <option value='Melaka'>Melaka</option>
              <option value='Perak'>Perak</option>
              <option value='Kedah'>Kedah</option>
              <option value='Negeri Sembilan'>Negeri Sembilan</option>
              <option value='Pahang'>Pahang</option>
              <option value='Terengganu'>Terengganu</option>
              <option value='Kelantan'>Kelantan</option>
              <option value='Perlis'>Perlis</option>
            </select>
            <div className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                className='text-gray-3'
              >
                <path
                  d='M7 10L12 15L17 10'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor='zipCode'
            className='block font-medium text-base text-black mb-2'
          >
            ZIP code
          </label>
          <input
            type='text'
            id='zipCode'
            name='zipCode'
            value={formData.zipCode}
            onChange={handleChange}
            className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors'
          />
        </div>

        <div>
          <label
            htmlFor='phone'
            className='block font-medium text-base text-black mb-2'
          >
            Phone
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors'
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='block font-medium text-base text-black mb-2'
          >
            Email address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors'
          />
        </div>

        <div>
          <label
            htmlFor='additionalInfo'
            className='block font-medium text-base text-black mb-2'
          >
            Additional information
          </label>
          <textarea
            id='additionalInfo'
            name='additionalInfo'
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={4}
            placeholder='Additional information'
            className='w-full min-h-[120px] px-4 py-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-gray-3'
          />
        </div>
        <button
          type='button'
          onClick={() => {
            if (formData.firstName && formData.lastName && formData.email) {
              onSubmit?.(formData);
              showToast('Billing details saved', 'success');
            } else {
              showToast('Please fill in required fields', 'error');
            }
          }}
          className='mt-6 bg-primary text-white font-semibold text-base px-12 py-3 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        >
          Save Details
        </button>
      </form>
    </div>
  );
};

export default BillingDetailsForm;
