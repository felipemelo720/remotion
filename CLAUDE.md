# Reglas de diseño — Comcer Reels

## Paleta de colores oficial

| Nombre     | Hex       | Uso                                      |
|------------|-----------|------------------------------------------|
| `darkBg`   | `#0E252C` | Fondo oscuro (verde petróleo)            |
| `lightBg`  | `#F3F9F5` | Fondo claro (blanco verdoso)             |
| `accent`   | `#98CC3F` | Verde lima — color de acento/marca       |
| `text`     | `#1A1A1A` | Texto sobre fondos claros                |
| `lightText`| `#FFFFFF` | Texto sobre fondos oscuros               |
| `gray`     | `#8B8B8B` | Texto secundario                         |
| `lightGray`| `#E5E5E5` | Elementos sutiles                        |

---

## Lo que NO se debe hacer

### Colores de fondo prohibidos

- **No usar el verde lima (`#98CC3F`) como color de fondo principal de un slide.**
  El logo de Comcer no genera suficiente contraste sobre este color, lo que afecta la legibilidad y la identidad visual. El verde lima está reservado exclusivamente para elementos de acento (líneas, estadísticas, dots, badges).

### Fondos permitidos

Solo se deben usar como fondo de slide:
- `#0E252C` (variante `dark`)
- `#F3F9F5` (variante `light`)

---

## Variantes de slide

El componente `SlideTemplate` acepta tres variantes:

- **`dark`** — fondo `#0E252C`, texto blanco. Uso general y slides de beneficios.
- **`light`** — fondo `#F3F9F5`, texto `#1A1A1A`. Slides de estadísticas y features.
- **`accent`** — **uso restringido**. Solo para slides de CTA (llamada a la acción) donde el logo NO se muestra o se usa en versión oscura.
