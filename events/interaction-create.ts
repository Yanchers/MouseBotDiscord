import {ClientEvents, Events} from "discord.js";
import {MouseClient} from "../index";
import {MouseDiscordEvent} from "./ready";

class InteractionCreate implements MouseDiscordEvent<keyof ClientEvents>{
    name: keyof ClientEvents = Events.InteractionCreate

    async execute(...args: ClientEvents[Events.InteractionCreate]): Promise<void> {
        const [interaction] = [...args]

        if (!interaction.isChatInputCommand()) return;

        const c = interaction.client as MouseClient

        const command = c.commands.get(interaction.commandName)
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Произошла ошибка при выполнении команды!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Произошла ошибка при выполнении команды!', ephemeral: true });
            }
        }
    }

}

module.exports = new InteractionCreate()