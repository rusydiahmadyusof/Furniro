'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import MobileMenu from './MobileMenu';
import SearchModal from './SearchModal';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import UserMenu from './UserMenu';
import { IMAGES } from '@/constants/images';
import AccountIcon from './icons/AccountIcon';
import SearchIcon from './icons/SearchIcon';
import WishlistIcon from './icons/WishlistIcon';
import CartIcon from './icons/CartIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user } = useAuth();
  const cartCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  return (
    <>
      <header className='fixed top-0 left-0 right-0 bg-white w-full h-[100px] flex items-center justify-between px-6 lg:px-16 z-50 shadow-sm'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className='lg:hidden text-gray-1 hover:text-primary transition-colors'
            aria-label='Open menu'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M3 12H21M3 6H21M3 18H21'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </button>
          <Link
            href='/'
            className='flex items-center gap-2'
          >
            <div className='h-8 w-12 relative'>
              <Image
                src={IMAGES.logo}
                alt='Furniro Logo'
                fill
                className='object-contain'
              />
            </div>
            <h1 className='font-montserrat font-bold text-[34px] text-black'>
              Furniro
            </h1>
          </Link>
        </div>

        <nav className='hidden md:flex items-center gap-12'>
          <Link
            href='/'
            className='font-medium text-base text-black hover:text-primary transition-colors focus:outline-none focus:text-primary'
          >
            Home
          </Link>
          <Link
            href='/shop'
            className='font-medium text-base text-black hover:text-primary transition-colors focus:outline-none focus:text-primary'
          >
            Shop
          </Link>
          <Link
            href='/about'
            className='font-medium text-base text-black hover:text-primary transition-colors focus:outline-none focus:text-primary'
          >
            About
          </Link>
          <Link
            href='/contact'
            className='font-medium text-base text-black hover:text-primary transition-colors focus:outline-none focus:text-primary'
          >
            Contact
          </Link>
        </nav>

        <div className='flex items-center gap-6'>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <button
              onClick={() => setIsSignInOpen(true)}
              aria-label='Sign In'
              className='w-6 h-6 text-gray-1 hover:text-primary transition-colors'
            >
              <AccountIcon />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label='Search'
            className='w-6 h-6 text-gray-1 hover:text-primary transition-colors'
          >
            <SearchIcon />
          </button>
          <Link
            href='/wishlist'
            className='w-6 h-6 relative text-gray-1 hover:text-primary transition-colors'
            aria-label='Wishlist'
          >
            <WishlistIcon />
            {wishlistCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-primary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center'>
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href='/cart'
            className='w-6 h-6 relative text-gray-1 hover:text-primary transition-colors'
            aria-label='Shopping Cart'
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-primary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center'>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />
    </>
  );
};

export default Header;
