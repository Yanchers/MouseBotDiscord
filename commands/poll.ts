import {SlashCommandBuilder} from "discord.js";


module.exports = {
    data: new SlashCommandBuilder()
        .setName('голосование')
        .setDescription('Сделай голосование на сервере')
        .addStringOption(opt => opt
            .setName('вопрос'))
}