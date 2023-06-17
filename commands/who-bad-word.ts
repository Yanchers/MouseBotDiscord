import {ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('кто')
        .setDescription('Покажет кто "смешное-слово" на этом сервере')
        .setDMPermission(false)
        .addStringOption(opt => opt
            .setName('смешное-слово')
            .setDescription('Педик там, или еще чета')
            .setRequired(true)),

    async execute(int: ChatInputCommandInteraction) {
        if (!int.guild) {
            console.error(`Guild is undefined =(`)
            return;
        }

        const members = await int.guild?.members.fetch()
        if (!members) {
            console.error(`Could not fetch members from guild ${int.guild?.name}`)
            return;
        }
        const rnd = members.random()
        if (!rnd) {
            console.error('Could not take random member')
            return
        }

        const badWord = int.options.getString('смешное-слово')
        await int.reply(`${rnd.displayName} - ${badWord}!!!`)
    }
}