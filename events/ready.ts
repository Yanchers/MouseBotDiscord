import {ClientEvents, Events} from "discord.js";

export interface MouseDiscordEvent<K extends keyof ClientEvents> {
    name: K,
    execute(...args: ClientEvents[K]): void
}

module.exports = {
    name: Events.ClientReady,
    async execute(..._: ClientEvents[Events.ClientReady]) {
        console.log("The bot is ready")

        const guildIds = process.env.GUILDS?.split(',')
        if (!guildIds) return;
        console.log(`Guilds ids: ${guildIds}`)
    }
}