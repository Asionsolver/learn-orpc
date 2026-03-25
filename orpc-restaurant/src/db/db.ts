// Our restaurant's main menu (Mock Database)
export const menuItems = [
  { id: 1, name: "Beef Burger", price: 300, isAvailable: true },
  { id: 2, name: "French Fries", price: 150, isAvailable: true },
  { id: 3, name: "Cold Coffee", price: 120, isAvailable: false },
];
// Proper type declaration of order
export type Order = {
  orderId: number;
  menuItemId: number;
  quantity: number;
  totalPrice: number;
  status: string;
};
// Place to keep customer order list
export const orders: Order[] = [];
