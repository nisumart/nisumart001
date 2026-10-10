import { CartItem, Product, Order, Customer } from '../types';

const CART_KEY = 'niskart_cart';
const OLD_CART_KEY = 'nisumart_cart';
const WISHLIST_KEY = 'niskart_wishlist';
const OLD_WISHLIST_KEY = 'nisumart_wishlist';
const RECENT_ORDERS_KEY = 'niskart_recent_orders';
const OLD_RECENT_ORDERS_KEY = 'nisumart_recent_orders';
const SELECTED_CITY_KEY = 'niskart_selected_city';
const OLD_SELECTED_CITY_KEY = 'nisumart_selected_city';
const CUSTOMER_KEY = 'niskart_customer';
const OLD_CUSTOMER_KEY = 'nisumart_customer';

export function getStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY) || localStorage.getItem(OLD_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(cart: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
}

export function getStoredWishlist(): string[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY) || localStorage.getItem(OLD_WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredWishlist(ids: string[]) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save wishlist to localStorage', e);
  }
}

export function getStoredRecentOrders(): Order[] {
  try {
    const raw = localStorage.getItem(RECENT_ORDERS_KEY) || localStorage.getItem(OLD_RECENT_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredRecentOrder(order: Order) {
  try {
    const existing = getStoredRecentOrders();
    const updated = [order, ...existing.filter((o) => o.id !== order.id)].slice(0, 20);
    localStorage.setItem(RECENT_ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save recent order to localStorage', e);
  }
}

export function getStoredCity(): string {
  try {
    return localStorage.getItem(SELECTED_CITY_KEY) || localStorage.getItem(OLD_SELECTED_CITY_KEY) || 'Dewas';
  } catch {
    return 'Dewas';
  }
}

export function saveStoredCity(city: string) {
  try {
    localStorage.setItem(SELECTED_CITY_KEY, city);
  } catch (e) {
    console.error('Failed to save selected city', e);
  }
}

export function getStoredCustomer(): Customer | null {
  try {
    const raw = localStorage.getItem(CUSTOMER_KEY) || localStorage.getItem(OLD_CUSTOMER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStoredCustomer(customer: Customer | null) {
  try {
    if (customer) {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    } else {
      localStorage.removeItem(CUSTOMER_KEY);
      localStorage.removeItem(OLD_CUSTOMER_KEY);
    }
  } catch (e) {
    console.error('Failed to save customer', e);
  }
}
