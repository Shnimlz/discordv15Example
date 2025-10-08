# 🎨 Discord Modal Avanzado - Demo

<div align="center">

![Discord.js](https://img.shields.io/badge/Discord.js-v15+-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v22+-339933?style=for-the-badge&logo=node.js&logoColor=white)

**Ejemplo completo de modales avanzados con Display Components en Discord**

</div>

---

## 📋 Tabla de Contenidos

- [✨ Características](#-características)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [📦 Requisitos](#-requisitos)
- [⚙️ Configuración](#️-configuración)
- [🎯 Uso](#-uso)
- [🧩 Componentes Implementados](#-componentes-implementados)
- [📝 Estructura del Modal](#-estructura-del-modal)
- [🔧 API Reference](#-api-reference)
- [💡 Ejemplos Avanzados](#-ejemplos-avanzados)

---

## ✨ Características

Este proyecto demuestra el uso de **Display Components** en modales de Discord, permitiendo:

- ✅ **TextDisplay** - Mostrar texto informativo en el modal
- ✅ **TextInput** - Campos de entrada de texto
- ✅ **UserSelect** - Selector de usuarios (multi-selección)
- ✅ **RoleSelect** - Selector de roles (multi-selección)
- ✅ **ChannelSelect** - Selector de canales con filtros por tipo
- ✅ **Labels** - Etiquetas descriptivas para cada componente
- ✅ **Validación** - Campos requeridos y opcionales
- ✅ **Respuestas efímeras** - Mensajes privados al usuario

---

## 🚀 Inicio Rápido

### 1. Clona el repositorio

```bash
git clone <tu-repo>
cd discord-modal-demo
```

### 2. Instala las dependencias

```bash
npm install discord.js discord-api-types
```

### 3. Configura el token

Crea un archivo `.env` en la raíz del proyecto:

```env
DISCORD_TOKEN=tu_token_aqui
```

### 4. Ejecuta el bot

```bash
node index.js
# o con TypeScript
npx tsx index.ts
```

---

## 📦 Requisitos

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| **Node.js** | v18+ | Runtime de JavaScript |
| **discord.js** | v14+ | Librería principal del bot |
| **discord-api-types** | v10+ | Tipos para componentes avanzados |

### Instalación de dependencias

```bash
npm install discord.js discord-api-types
```

---

## ⚙️ Configuración

### 1. Obtener el token del bot

1. Ve al [Discord Developer Portal](https://discord.com/developers/applications)
2. Crea una nueva aplicación o selecciona una existente
3. Ve a la sección **Bot**
4. Copia el token y guárdalo en tu archivo `.env`

### 2. Permisos requeridos

El bot necesita los siguientes **Gateway Intents**:

- ✅ `Guilds` - Para acceder a información del servidor
- ✅ `GuildMessages` - Para leer mensajes
- ✅ `MessageContent` - Para leer el contenido de los mensajes

### 3. Invitar el bot

Genera un enlace de invitación con estos permisos:

- `Send Messages` - Enviar mensajes
- `Read Messages` - Leer mensajes
- `Use Slash Commands` - Usar comandos (opcional)

---

## 🎯 Uso

### Comando básico

Escribe en cualquier canal de texto:

```
!modal
```

### Flujo de trabajo

1. **Envío del comando** → El bot responde con un botón
2. **Clic en el botón** → Se abre un modal avanzado
3. **Completar el modal** → Campos de texto, selectores, etc.
4. **Enviar** → El bot procesa y responde con los datos

### Ejemplo visual

```
Usuario: !modal
Bot: Haz clic para abrir el modal: [Botón: Abrir modal]

[Usuario hace clic]

┌─────────────────────────────────────┐
│  Modal avanzado                     │
├─────────────────────────────────────┤
│  Lee esto antes de continuar.      │
│                                     │
│  Escribe algo                       │
│  [_________________________]        │
│                                     │
│  Selecciona usuarios (máx 3)       │
│  [Selector de usuarios ▼]          │
│                                     │
│  Selecciona roles (máx 2)          │
│  [Selector de roles ▼]             │
│                                     │
│  Selecciona canales de texto       │
│  [Selector de canales ▼]           │
│                                     │
│          [Cancelar] [Enviar]       │
└─────────────────────────────────────┘
```

---

## 🧩 Componentes Implementados

### 📄 TextDisplay

```typescript
{
    type: ComponentType.TextDisplay,
    content: 'Lee esto antes de continuar.'
}
```

Muestra texto informativo estático en el modal.

---

### ✏️ TextInput

```typescript
{
    type: ComponentType.Label,
    label: 'Escribe algo',
    component: {
        type: ComponentType.TextInput,
        customId: 'input1',
        style: TextInputStyle.Short,
        required: true,
        placeholder: 'Tu respuesta...'
    }
}
```

| Propiedad | Valor | Descripción |
|-----------|-------|-------------|
| `customId` | `'input1'` | ID único para recuperar el valor |
| `style` | `Short` | Texto corto (una línea) |
| `required` | `true` | Campo obligatorio |
| `placeholder` | `'Tu respuesta...'` | Texto de ayuda |

---

### 👥 UserSelect

```typescript
{
    type: ComponentType.Label,
    label: 'Selecciona usuarios (máx 3)',
    component: {
        type: ComponentType.UserSelect,
        customId: 'users',
        required: false,
        minValues: 0,
        maxValues: 3,
        placeholder: 'Usuarios...'
    }
}
```

| Propiedad | Valor | Descripción |
|-----------|-------|-------------|
| `minValues` | `0` | Mínimo de usuarios seleccionables |
| `maxValues` | `3` | Máximo de usuarios seleccionables |
| `required` | `false` | Campo opcional |

---

### 🎭 RoleSelect

```typescript
{
    type: ComponentType.Label,
    label: 'Selecciona roles (máx 2)',
    component: {
        type: ComponentType.RoleSelect,
        customId: 'roles',
        required: false,
        minValues: 0,
        maxValues: 2,
        placeholder: 'Roles...'
    }
}
```

Permite seleccionar roles del servidor con límites personalizables.

---

### 📢 ChannelSelect

```typescript
{
    type: ComponentType.Label,
    label: 'Selecciona canales de texto',
    component: {
        type: ComponentType.ChannelSelect,
        customId: 'channels',
        required: false,
        minValues: 0,
        maxValues: 2,
        placeholder: 'Canales...',
        channelTypes: [
            ChannelType.GuildText,
            ChannelType.PublicThread,
            ChannelType.PrivateThread
        ]
    }
}
```

| Propiedad | Descripción |
|-----------|-------------|
| `channelTypes` | Filtra solo canales de texto y hilos |
| `maxValues` | Límite de canales seleccionables |

---

## 📝 Estructura del Modal

### Definición completa

```typescript
const modal = {
    title: 'Modal avanzado',          // Título del modal
    customId: 'miModal',               // ID único para identificar el modal
    components: [
        // TextDisplay
        { 
            type: ComponentType.TextDisplay, 
            content: 'Texto informativo' 
        },
        
        // TextInput con Label
        {
            type: ComponentType.Label,
            label: 'Etiqueta descriptiva',
            component: {
                type: ComponentType.TextInput,
                customId: 'id_unico',
                // ... configuración
            }
        },
        
        // Selectores con Label
        {
            type: ComponentType.Label,
            label: 'Descripción',
            component: {
                type: ComponentType.UserSelect,
                customId: 'id_selector',
                // ... configuración
            }
        }
    ]
};
```

---

## 🔧 API Reference

### Mostrar el modal

```typescript
await interaction.showModal(modal);
```

### Recuperar valores del modal

#### TextInput

```typescript
const textValue = interaction.components.getTextInputValue('input1');
```

#### Selectores

```typescript
// Usuarios
const users = interaction.components.getSelectedUsers('users');

// Roles
const roles = interaction.components.getSelectedRoles('roles');

// Canales
const channels = interaction.components.getSelectedChannels('channels', false, [
    ChannelType.GuildText,
    ChannelType.PublicThread,
    ChannelType.PrivateThread
]);
```

### Procesar colecciones

```typescript
const usersStr = users
    ? Array.from(users.values())
        .filter(Boolean)
        .map((u) => u?.tag ?? u?.username ?? u?.id)
        .join(', ')
    : 'ninguno';
```

---

## 💡 Ejemplos Avanzados

### Validación personalizada

```typescript
if (interaction.isModalSubmit() && interaction.customId === 'miModal') {
    const textValue = interaction.components.getTextInputValue('input1');
    
    // Validar longitud mínima
    if (textValue.length < 5) {
        await interaction.reply({
            content: '❌ El texto debe tener al menos 5 caracteres',
            flags: 64 // Ephemeral
        });
        return;
    }
    
    // Procesar datos válidos
    await interaction.reply({
        content: `✅ Datos procesados correctamente`,
        flags: 64
    });
}
```

### Modal con múltiples TextInputs

```typescript
components: [
    {
        type: ComponentType.Label,
        label: 'Nombre',
        component: {
            type: ComponentType.TextInput,
            customId: 'nombre',
            style: TextInputStyle.Short,
            required: true
        }
    },
    {
        type: ComponentType.Label,
        label: 'Descripción',
        component: {
            type: ComponentType.TextInput,
            customId: 'descripcion',
            style: TextInputStyle.Paragraph, // Multilínea
            required: false,
            minLength: 10,
            maxLength: 500
        }
    }
]
```

### Respuesta formateada con Embed

```typescript
await interaction.reply({
    embeds: [{
        title: '📊 Datos del Modal',
        fields: [
            { name: 'Texto', value: textValue, inline: false },
            { name: 'Usuarios', value: usersStr, inline: true },
            { name: 'Roles', value: rolesStr, inline: true },
            { name: 'Canales', value: channelsStr, inline: false }
        ],
        color: 0x5865F2,
        timestamp: new Date().toISOString()
    }],
    flags: 64
});
```

---

## 🐛 Troubleshooting

### Error: "Unknown Interaction"

**Causa:** El modal tardó más de 3 segundos en mostrarse.

**Solución:**
```typescript
if (interaction.isButton()) {
    await interaction.deferUpdate(); // Diferir la respuesta
    await interaction.showModal(modal);
}
```

### Error: "Missing Access"

**Causa:** El bot no tiene permisos suficientes.

**Solución:** Verifica que el bot tenga estos intents habilitados en el Developer Portal:
- `Guilds`
- `GuildMessages`
- `MessageContent`

### Los selectores no devuelven valores

**Causa:** Posible problema con valores opcionales.

**Solución:** Verifica que `minValues: 0` esté configurado para campos opcionales.

---

## 📚 Recursos Adicionales

- [Discord.js Documentation](https://discord.js.org/)
- [Discord API Types](https://discord-api-types.dev/)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [Display Components Spec](https://discord.com/developers/docs/interactions/message-components#display-components)

---

## 🤝 Contribuciones

¿Encontraste un bug o tienes una idea? ¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

<div align="center">

### ⚡ Desarrollado con 💜

**Discord Modal Demo © 2025**

[![Discord.js](https://img.shields.io/badge/Discord.js-v15-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.js.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v22+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)

**[⭐ Dale una estrella si te fue útil](https://github.com)**

</div
