import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('пинг')
        .setDescription('ответит тебе понг. Вау.'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply('Понг')
    }
}