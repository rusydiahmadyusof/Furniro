'use client';

import { useState } from 'react';

interface BillingDetailsFormProps {
  onDataChange?: (data: BillingFormData) => void;
  initialData?: Partial<BillingFormData>;
  showErrors?: boolean;
  errors?: Record<string, string>;
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

const BillingDetailsForm = ({
  onDataChange,
  initialData,
  showErrors = false,
  errors: externalErrors = {},
}: BillingDetailsFormProps) => {
  const [formData, setFormData] = useState<BillingFormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    companyName: initialData?.companyName || '',
    country: initialData?.country || 'Malaysia',
    streetAddress: initialData?.streetAddress || '',
    townCity: initialData?.townCity || '',
    province: initialData?.province || 'Kuala Lumpur',
    zipCode: initialData?.zipCode || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    additionalInfo: initialData?.additionalInfo || '',
  });
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Use external errors if provided, otherwise use local errors
  const errors =
    Object.keys(externalErrors).length > 0 ? externalErrors : localErrors;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    try {
      if (!e?.target?.name) {
        console.warn('Form change event missing target name');
        return;
      }

      const newData = {
        ...formData,
        [e.target.name]: e.target.value || '',
      };
      setFormData(newData);

      // Clear error for this field
      if (localErrors[e.target.name]) {
        setLocalErrors({ ...localErrors, [e.target.name]: '' });
      }

      // Notify parent of data change
      if (onDataChange) {
        try {
          onDataChange(newData);
        } catch (parentError) {
          console.error('Error in parent onDataChange:', parentError);
        }
      }
    } catch (error) {
      console.error('Error handling form change:', error);
    }
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
              className={`w-full h-[75px] px-4 border rounded-[10px] focus:outline-none transition-colors placeholder:text-gray-3 ${
                showErrors && errors.firstName
                  ? 'border-red-accent focus:border-red-accent'
                  : 'border-gray-3 focus:border-primary'
              }`}
            />
            {showErrors && errors.firstName && (
              <p className='text-red-accent text-sm mt-1'>{errors.firstName}</p>
            )}
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
              className={`w-full h-[75px] px-4 border rounded-[10px] focus:outline-none transition-colors placeholder:text-gray-3 ${
                showErrors && errors.lastName
                  ? 'border-red-accent focus:border-red-accent'
                  : 'border-gray-3 focus:border-primary'
              }`}
            />
            {showErrors && errors.lastName && (
              <p className='text-red-accent text-sm mt-1'>{errors.lastName}</p>
            )}
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
            className={`w-full h-[75px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
              showErrors && errors.streetAddress
                ? 'border-red-accent focus:border-red-accent'
                : 'border-gray-3 focus:border-primary'
            }`}
          />
          {showErrors && errors.streetAddress && (
            <p className='text-red-accent text-sm mt-1'>
              {errors.streetAddress}
            </p>
          )}
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
            className={`w-full h-[75px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
              showErrors && errors.townCity
                ? 'border-red-accent focus:border-red-accent'
                : 'border-gray-3 focus:border-primary'
            }`}
          />
          {showErrors && errors.townCity && (
            <p className='text-red-accent text-sm mt-1'>{errors.townCity}</p>
          )}
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
            className={`w-full h-[75px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
              showErrors && errors.zipCode
                ? 'border-red-accent focus:border-red-accent'
                : 'border-gray-3 focus:border-primary'
            }`}
          />
          {showErrors && errors.zipCode && (
            <p className='text-red-accent text-sm mt-1'>{errors.zipCode}</p>
          )}
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
            className={`w-full h-[75px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
              showErrors && errors.phone
                ? 'border-red-accent focus:border-red-accent'
                : 'border-gray-3 focus:border-primary'
            }`}
          />
          {showErrors && errors.phone && (
            <p className='text-red-accent text-sm mt-1'>{errors.phone}</p>
          )}
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
            className={`w-full h-[75px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
              showErrors && errors.email
                ? 'border-red-accent focus:border-red-accent'
                : 'border-gray-3 focus:border-primary'
            }`}
          />
          {showErrors && errors.email && (
            <p className='text-red-accent text-sm mt-1'>{errors.email}</p>
          )}
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
      </form>
    </div>
  );
};

export default BillingDetailsForm;
