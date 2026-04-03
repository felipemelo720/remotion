import * as fs from "fs";
import * as path from "path";
import { WCProduct, WCCategory, CacheData } from "../types/woocommerce";

const CACHE_FILE = path.join(process.cwd(), "src/data/wc-cache.json");
const ASSETS_DIR = path.join(process.cwd(), "public/wc-images");

const API_URL = process.env.WOOCOMMERCE_URL || "";
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
  console.warn("⚠️ WooCommerce credentials not configured in .env");
}

/**
 * Build API URL with authentication
 */
const buildUrl = (endpoint: string, params: Record<string, any> = {}) => {
  const url = new URL(`${API_URL}${endpoint}`);
  url.searchParams.append("consumer_key", CONSUMER_KEY);
  url.searchParams.append("consumer_secret", CONSUMER_SECRET);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

/**
 * Fetch products with pagination
 */
export const fetchProducts = async (
  page: number = 1,
  per_page: number = 100
): Promise<WCProduct[]> => {
  try {
    const url = buildUrl("/products", { page, per_page });
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

/**
 * Fetch featured products
 */
export const fetchFeaturedProducts = async (): Promise<WCProduct[]> => {
  try {
    const url = buildUrl("/products", { featured: true, per_page: 100 });
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

/**
 * Fetch categories
 */
export const fetchCategories = async (): Promise<WCCategory[]> => {
  try {
    const url = buildUrl("/products/categories", { per_page: 100 });
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

/**
 * Download image from URL
 */
const downloadImage = async (
  imageUrl: string,
  filename: string
): Promise<string | null> => {
  try {
    // Ensure assets directory exists
    if (!fs.existsSync(ASSETS_DIR)) {
      fs.mkdirSync(ASSETS_DIR, { recursive: true });
    }

    const response = await fetch(imageUrl);
    if (!response.ok) return null;

    const buffer = await response.arrayBuffer();
    const filepath = path.join(ASSETS_DIR, filename);

    fs.writeFileSync(filepath, Buffer.from(buffer));
    return `public/wc-images/${filename}`;
  } catch (error) {
    console.error(`Error downloading image ${imageUrl}:`, error);
    return null;
  }
};

/**
 * Load cache from JSON file
 */
export const loadCache = (): CacheData | null => {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading cache:", error);
  }
  return null;
};

/**
 * Save cache to JSON file
 */
const saveCache = (data: CacheData): void => {
  try {
    const dir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error saving cache:", error);
  }
};

/**
 * Sync all products and download images
 */
export const syncProducts = async (): Promise<void> => {
  console.log("📦 Syncing WooCommerce products...");

  const products = await fetchProducts();
  const categories = await fetchCategories();

  // Download images
  for (const product of products) {
    for (const image of product.images) {
      const filename = `${product.id}-${image.id}.jpg`;
      const localPath = await downloadImage(image.src, filename);
      if (localPath) {
        image.src = localPath;
      }
    }
  }

  // Save cache
  const cache: CacheData = {
    products,
    categories,
    lastUpdated: new Date().toISOString(),
  };

  saveCache(cache);
  console.log(`✅ Synced ${products.length} products and ${categories.length} categories`);
};

/**
 * Get products (from cache or API)
 */
export const getProducts = async (
  useFresh: boolean = false
): Promise<WCProduct[]> => {
  if (!useFresh) {
    const cache = loadCache();
    if (cache) return cache.products;
  }

  return await fetchProducts();
};

/**
 * Get categories (from cache or API)
 */
export const getCategories = async (
  useFresh: boolean = false
): Promise<WCCategory[]> => {
  if (!useFresh) {
    const cache = loadCache();
    if (cache) return cache.categories;
  }

  return await fetchCategories();
};
