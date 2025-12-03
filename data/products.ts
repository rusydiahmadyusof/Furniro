export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  badge?: 'new' | 'discount';
  imageUrl: string;
  category?: string;
  images?: string[];
  details?: string;
}

export const allProducts: Product[] = [
  {
    id: '1',
    name: 'Syltherine',
    description: 'Modern dining set',
    price: 'RM 2,500',
    originalPrice: 'RM 3,500',
    discount: '-30%',
    badge: 'discount',
    imageUrl: '/images/products/image 12.png',
    category: 'Dining',
    details:
      'A contemporary dining set featuring a minimalist white table with elegant hourglass-shaped stools. Perfect for modern homes seeking style and functionality.',
  },
  {
    id: '2',
    name: 'Leviosa',
    description: 'Stylish cafe chair',
    price: 'Rp 2.500.000',
    imageUrl: '/images/products/image 23.png',
    category: 'Dining',
    details:
      'Elegant cafe chair with contemporary design. Features ergonomic support and premium finish.',
  },
  {
    id: '3',
    name: 'Lolito',
    description: 'Complete dining room set',
    price: 'RM 7,000',
    originalPrice: 'RM 14,000',
    discount: '-50%',
    badge: 'discount',
    imageUrl: '/images/products/Rectangle 40.png',
    category: 'Dining',
    details:
      'Elegant dining room set with dark rectangular table and six comfortable upholstered chairs. Includes matching pendant light for a complete dining experience.',
  },
  {
    id: '4',
    name: 'Respira',
    description: 'Luxury L-shaped sectional sofa',
    price: 'RM 500',
    badge: 'new',
    imageUrl: '/images/products/image 41.png',
    category: 'Living',
    details:
      'Spacious L-shaped sectional sofa in elegant dark grey with decorative throw pillows. Perfect for creating a cozy and inviting living space.',
  },
  {
    id: '5',
    name: 'Grifo',
    description: 'Night lamp',
    price: 'RM 1,500',
    imageUrl: '/images/products/13.png',
    category: 'Bedroom',
    details:
      'Elegant night lamp with adjustable brightness. Creates a warm and cozy atmosphere in your bedroom.',
  },
  {
    id: '6',
    name: 'Muggo',
    description: 'Small mug',
    price: 'RM 150',
    badge: 'new',
    imageUrl: '/images/products/image 61.png',
    category: 'Dining',
    details:
      'Handcrafted ceramic mug with unique design. Perfect for your morning coffee or evening tea.',
  },
  {
    id: '7',
    name: 'Pingky',
    description: 'Cute bed set',
    price: 'RM 7,000',
    originalPrice: 'RM 14,000',
    discount: '-50%',
    badge: 'discount',
    imageUrl: '/images/products/Rectangle 41.png',
    category: 'Bedroom',
    details:
      "Complete bed set with matching pillows and sheets. Soft, breathable fabric for a comfortable night's sleep.",
  },
  {
    id: '8',
    name: 'Potty',
    description: 'Minimalist flower pot',
    price: 'RM 500',
    badge: 'new',
    imageUrl: '/images/products/image 76.png',
    category: 'Decor',
    details:
      'Minimalist design flower pot that complements any interior. Made from premium ceramic material.',
  },
  {
    id: '9',
    name: 'Syltherine',
    description: 'Modern dining set',
    price: 'RM 2,500',
    originalPrice: 'RM 3,500',
    discount: '-30%',
    badge: 'discount',
    imageUrl: '/images/products/image 81.png',
    category: 'Dining',
    details:
      'A contemporary dining set featuring a minimalist white table with elegant hourglass-shaped stools. Perfect for modern homes seeking style and functionality.',
  },
  {
    id: '10',
    name: 'Leviosa',
    description: 'Stylish cafe chair',
    price: 'Rp 2.500.000',
    imageUrl: '/images/products/image 82.png',
    category: 'Dining',
    details:
      'Elegant cafe chair with contemporary design. Features ergonomic support and premium finish.',
  },
  {
    id: '11',
    name: 'Lolito',
    description: 'Complete dining room set',
    price: 'RM 7,000',
    originalPrice: 'RM 14,000',
    discount: '-50%',
    badge: 'discount',
    imageUrl: '/images/products/Rectangle 43.png',
    category: 'Dining',
    details:
      'Elegant dining room set with dark rectangular table and six comfortable upholstered chairs. Includes matching pendant light for a complete dining experience.',
  },
  {
    id: '12',
    name: 'Respira',
    description: 'Luxury L-shaped sectional sofa',
    price: 'RM 500',
    badge: 'new',
    imageUrl: '/images/products/image 89.png',
    category: 'Living',
    details:
      'Spacious L-shaped sectional sofa in elegant dark grey with decorative throw pillows. Perfect for creating a cozy and inviting living space.',
  },
  {
    id: '13',
    name: 'Grifo',
    description: 'Night lamp',
    price: 'RM 1,500',
    imageUrl: '/images/products/image 99.png',
    category: 'Bedroom',
    details:
      'Elegant night lamp with adjustable brightness. Creates a warm and cozy atmosphere in your bedroom.',
  },
  {
    id: '14',
    name: 'Muggo',
    description: 'Small mug',
    price: 'RM 150',
    badge: 'new',
    imageUrl: '/images/products/image 100.png',
    category: 'Dining',
    details:
      'Handcrafted ceramic mug with unique design. Perfect for your morning coffee or evening tea.',
  },
  {
    id: '15',
    name: 'Pingky',
    description: 'Cute bed set',
    price: 'RM 7,000',
    originalPrice: 'RM 14,000',
    discount: '-50%',
    badge: 'discount',
    imageUrl: '/images/products/Rectangle 44.png',
    category: 'Bedroom',
    details:
      "Complete bed set with matching pillows and sheets. Soft, breathable fabric for a comfortable night's sleep.",
  },
  {
    id: '16',
    name: 'Potty',
    description: 'Minimalist flower pot',
    price: 'RM 500',
    badge: 'new',
    imageUrl: '/images/products/Rectangle 45.png',
    category: 'Decor',
    details:
      'Minimalist design flower pot that complements any interior. Made from premium ceramic material.',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter((product) => product.category === category);
};
