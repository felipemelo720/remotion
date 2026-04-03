# Services

Backend services and integrations.

## WooCommerce

Módulo para conectar a WooCommerce API de Comcer.

### Configuración

1. Copia `.env.example` a `.env`
2. Agregua tus credenciales WooCommerce

### Uso

```typescript
import { getProducts, getCategories, syncProducts } from "./services/woocommerce";

// Obtener productos (desde cache si existe)
const products = await getProducts();

// Obtener categorías
const categories = await getCategories();

// Sincronizar (descargar imágenes, actualizar cache)
await syncProducts();

// Forzar fetch fresco (no cache)
const freshProducts = await getProducts(true);
```

### Cache

- Ubicación: `src/data/wc-cache.json`
- Imágenes: `public/wc-images/`
- Auto-actualiza con `syncProducts()`
