/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryId = 'all' | 'tools' | 'generators' | 'pumps' | 'machinery' | 'accessories';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string; // name of a Lucide icon
  count: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  price: number; // in UZS
  originalPrice?: number; // in UZS
  image: string;
  rating: number;
  reviewsCount: number;
  tag?: 'YANGI' | 'HEAVY-DUTY' | '-15%' | 'CHEGIRMA';
  description: string;
  specs: ProductSpec[];
  warrantyMonths: number;
  isAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  authorInitials: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  region: string;
  address: string;
  deliveryMethod: 'standart' | 'tezkor';
  paymentMethod: 'naqd' | 'karta';
}

export interface AppOrder {
  id: string;
  date: string;
  fullName: string;
  phone: string;
  region: string;
  address: string;
  deliveryMethod: 'standart' | 'tezkor';
  paymentMethod: 'naqd' | 'karta';
  items: CartItem[];
  totalPrice: number;
  status: 'Yangi' | 'Yetkazilmoqda' | 'Tugallandi' | 'Bekor qilindi';
}
