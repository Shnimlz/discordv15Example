import { Client, GatewayIntentBits, Events } from 'discord.js';
import { ButtonStyle, ComponentType, TextInputStyle, ChannelType } from 'discord-api-types/v10';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, () => {
    console.log(`Bot listo como ${client.user?.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.content === '!modal') {
        // Enviar un botón (sin Builders) para abrir el modal
        await message.channel.send({
            content: 'Haz clic para abrir el modal:',
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            custom_id: 'openModal',
                            label: 'Abrir modal',
                            style: ButtonStyle.Primary,
                        },
                    ],
                },
            ],
        });
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    // Abrir el modal cuando se presiona el botón
    if (interaction.isButton() && interaction.customId === 'openModal') {
        const modal = {
            title: 'Modal avanzado',
            customId: 'miModal',
            components: [
                { type: ComponentType.TextDisplay, content: 'Lee esto antes de continuar.' },
                {
                    type: ComponentType.Label,
                    label: 'Escribe algo',
                    component: {
                        type: ComponentType.TextInput,
                        customId: 'input1',
                        style: TextInputStyle.Short,
                        required: true,
                        placeholder: 'Tu respuesta...',
                    },
                },
                {
                    type: ComponentType.Label,
                    label: 'Selecciona usuarios (máx 3)',
                    component: {
                        type: ComponentType.UserSelect,
                        customId: 'users',
                        required: false,
                        minValues: 0,
                        maxValues: 3,
                        placeholder: 'Usuarios...',
                    },
                },
                {
                    type: ComponentType.Label,
                    label: 'Selecciona roles (máx 2)',
                    component: {
                        type: ComponentType.RoleSelect,
                        customId: 'roles',
                        required: false,
                        minValues: 0,
                        maxValues: 2,
                        placeholder: 'Roles...',
                    },
                },
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
                        channelTypes: [ChannelType.GuildText, ChannelType.PublicThread, ChannelType.PrivateThread],
                    },
                },
            ],
        } as const;

        await interaction.showModal(modal);
        return;
    }

    // Manejar el envío del modal
    if (interaction.isModalSubmit() && interaction.customId === 'miModal') {
        const textValue = interaction.components.getTextInputValue('input1');

        const users = interaction.components.getSelectedUsers('users');
        const roles = interaction.components.getSelectedRoles('roles');
        const channels = interaction.components.getSelectedChannels('channels', false, [
            ChannelType.GuildText,
            ChannelType.PublicThread,
            ChannelType.PrivateThread,
        ]);

        const usersStr = users
            ? Array.from(users.values())
                .filter(Boolean)
                .map((u: any) => u?.tag ?? u?.username ?? u?.id)
                .join(', ')
            : 'ninguno';
        const rolesStr = roles
            ? Array.from(roles.values())
                .filter(Boolean)
                .map((r: any) => r?.name ?? r?.id)
                .join(', ')
            : 'ninguno';
        const channelsStr = channels
            ? Array.from(channels.values())
                .filter(Boolean)
                .map((c: any) => c?.name ?? c?.id)
                .join(', ')
            : 'ninguno';

        await interaction.reply({
            content: [
                `Texto: ${textValue}`,
                `Usuarios: ${usersStr}`,
                `Roles: ${rolesStr}`,
                `Canales: ${channelsStr}`,
            ].join('\n'),
            flags: 64, // Ephemeral
        });
    }
});

process.loadEnvFile()
const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error('Falta la variable de entorno DISCORD_TOKEN');
    process.exit(1);
}
client.login(token);
