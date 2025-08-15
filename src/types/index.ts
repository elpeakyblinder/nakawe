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
};
