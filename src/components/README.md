# Components

Biblioteca reutilizable de componentes para videos Remotion.

## Estructura

- **ui/** - Componentes visuales (Badge, TextBlock, etc)
- **layouts/** - Componentes de layout
- **animations/** - Utilidades de animación con Framer Motion

## Uso

### TextBlock
```tsx
import { TextBlock } from "./components/ui/TextBlock";

<TextBlock
  title="Mi título"
  subtitle="Mi subtítulo"
  align="center"
  color="#ffffff"
/>
```

### Badge
```tsx
import { Badge } from "./components/ui/Badge";

<Badge text="Nuevo" color="blue" size="md" />
```

### Animaciones
```tsx
import { fadeInOut, slideIn } from "./components/animations/fadeInOut";

// Usar en componentes Remotion
const style = fadeInOut(frame, 30); // duration 30 frames
```

## Agregar nuevos componentes

1. Crear archivo en carpeta apropiada
2. Exportar desde `index.ts` (si existe)
3. Documentar en este README
