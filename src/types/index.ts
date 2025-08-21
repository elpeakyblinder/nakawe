export type Collection = {
    id: string;
    name: string;
    description: string;
    design_history: string,
    cover_image_url: string;
    artisan_name: string;
    product_count: number;
};

export type CollectionDetails = {
    id: string;
    name: string;
    description: string;
    target_market: string;
    design_concept: string;
    design_history: string;
    cover_image_url: string;
    artisan_name: string;
    products: Product[];
};

export type Product = {
    id: string;
    name: string;
    main_image_url: string;
    price: number;
    category: string | null;
    product_brief: string | null;
    production_time: string | null;
    artisan_id: string;
    category_id: string;
    collection_id: string;
    code: string;
    description: string | null;
    materials: string | null;
    origin: string | null;
    sale_type: string | null;
    stock: number | null;
};

// Representa un producto dentro del carrito, añadiendo la cantidad.
export type CartItem = Product & {
    quantity: number;
    artisan_name: string;
    category: string | null;
};

// Define la forma del contexto del carrito: qué datos y funciones contiene.
export type CartContextType = {
    cartItems: CartItem[];
    addItem: (product: Product & { artisan_name: string }, quantity: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    totalItems: number;
};

export type FavoriteItem = Product & {
    artisan_name: string;
};

// Define la forma del contexto de favoritos.
export type FavoritesContextType = {
    favoriteItems: FavoriteItem[];
    addFavorite: (product: Product & { artisan_name: string }) => void;
    removeFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean; // Función útil para saber si un producto ya es favorito
};