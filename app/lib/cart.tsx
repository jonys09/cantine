import { createContext, useContext, useEffect, useState } from 'react';

export type CartProduct = {
    id: string;
    name: string;
    price: number;
    priceLabel: string;
    image: string | null;
    variantId?: string | null;  // Shopify variant GID for checkout
};

export type CartItem = CartProduct & { quantity: number };

type CartCtx = {
    items: CartItem[];
    addItem: (p: CartProduct) => void;
    removeItem: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    itemCount: number;
    subtotal: number;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
};

const CartContext = createContext<CartCtx>({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    updateQty: () => {},
    itemCount: 0,
    subtotal: 0,
    isOpen: false,
    openCart: () => {},
    closeCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const addItem = (p: CartProduct) => {
        setItems(prev => {
            const exists = prev.find(i => i.id === p.id);
            if (exists) return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { ...p, quantity: 1 }];
        });
        setIsOpen(true);
    };

    const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

    const updateQty = (id: string, qty: number) => {
        if (qty <= 0) removeItem(id);
        else setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    };

    const itemCount = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{
            items, addItem, removeItem, updateQty,
            itemCount, subtotal,
            isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() { return useContext(CartContext); }
