import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { sql } from '@vercel/postgres';
import { type UserProfileData } from '@/types/auth';
import { type Collection, type Product, type CollectionDetails } from '@/types';
import { unstable_noStore as noStore } from 'next/cache';

// Obtiene el perfil del usuario autenticado
export async function getAuthenticatedUserProfile(): Promise<UserProfileData | null> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    noStore();

    if (!sessionToken) {
        return null;
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(sessionToken, secret);
        const userId = payload.userId as string;

        const { rows } = await sql<UserProfileData>`
            SELECT 
                u.email,
                u.created_at,
                u.status,
                r.name AS role,
                p.first_name,
                p.last_name,
                p.birth_date,
                p.avatar_url
            FROM users AS u
            LEFT JOIN profiles AS p ON u.id = p.id
            LEFT JOIN user_roles AS ur ON u.id = ur.user_id
            LEFT JOIN roles AS r ON ur.role_id = r.id
            WHERE u.id = ${userId};
        `;
        console.log('Datos obtenidos de la base de datos:', rows);
        if (rows.length === 0) {
            return null;
        }

        return rows[0];

    } catch (err) {
        console.error('Fallo al obtener perfil:', err);
        return null;
    }
}

// Obtiene todas las colecciones
export async function fetchCollections(): Promise<Collection[]> {
    noStore();

    try {
        const query = `
        SELECT
            c.id, c.name, c.description, c.design_history, c.cover_image_url,
            a.display_name AS artisan_name,
            COUNT(p.id) AS product_count
        FROM collections c
        JOIN artisans a ON c.artisan_id = a.id
        LEFT JOIN products p ON c.id = p.collection_id
        GROUP BY c.id, a.display_name;
        `;
        const result = await sql.query(query);

        const rows = result.rows.map(row => ({
            ...row,
            id: String(row.id),
            name: String(row.name),
            description: String(row.description),
            design_history: String(row.design_history),
            cover_image_url: String(row.cover_image_url),
            artisan_name: String(row.artisan_name),
            product_count: parseInt(row.product_count as string, 10) || 0,
        })) as Collection[];

        return rows;
    } catch (error) {
        console.error("Error al obtener las colecciones desde la base de datos:", error);
        return [];
    }
}

// Obtiene la colección por su ID
export async function fetchCollectionById(id: string): Promise<CollectionDetails | null> {
    noStore();

    try {
        const collectionQuery = sql`
      SELECT
        c.id, c.name, c.description, c.target_market, c.design_concept, c.design_history, c.cover_image_url,
        a.display_name AS artisan_name
      FROM collections c
      JOIN artisans a ON c.artisan_id = a.id
      WHERE c.id = ${id};
    `;

        // Esta consulta ahora incluye los JOINs para obtener todos los datos
        const productsQuery = sql`
      SELECT 
        p.*,
        a.display_name as artisan_name,
        cat.name as category
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      LEFT JOIN categories cat ON p.category_id = cat.id
      WHERE p.collection_id = ${id};
    `;

        const [collectionResult, productsResult] = await Promise.all([collectionQuery, productsQuery]);

        if (collectionResult.rows.length === 0) {
            return null;
        }

        const collectionData = collectionResult.rows[0];
        const productsData = productsResult.rows;

        return {
            ...collectionData,
            products: productsData,
        } as CollectionDetails;

    } catch (error) {
        console.error(`Error al obtener la colección con ID ${id}:`, error);
        return null;
    }
}

// Obtiene el producto por su ID
export async function fetchProductById(id: string): Promise<(Product & { artisan_name: string }) | null> {
    noStore();
    try {
        const result = await sql`
            SELECT
                p.*,
                a.display_name as artisan_name,
                cat.name as category
            FROM products p
            JOIN artisans a ON p.artisan_id = a.id
            LEFT JOIN categories cat ON p.category_id = cat.id
            WHERE p.id = ${id};
        `;
        if (result.rows.length === 0) return null;
        return result.rows[0] as Product & { artisan_name: string, category: string | null };
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
        return null;
    }
}

// Obtiene otros productos aleatorios de la misma colección
export async function fetchRelatedProducts(collectionId: string, currentProductId: string): Promise<(Product & { artisan_name: string; category: string | null })[]> {
    noStore();
    try {
        const result = await sql`
      SELECT 
        p.*,
        a.display_name as artisan_name,
        cat.name as category
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      LEFT JOIN categories cat ON p.category_id = cat.id
      WHERE p.collection_id = ${collectionId} AND p.id != ${currentProductId};
    `;

        const shuffled = result.rows.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10) as (Product & { artisan_name: string; category: string | null })[];
    } catch (error) {
        console.error(`Error al obtener productos relacionados:`, error);
        return [];
    }
}