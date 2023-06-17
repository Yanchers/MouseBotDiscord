import fs from 'fs'
import path from 'path'

import {Client, GatewayIntentBits, Events, Collection, ClientEvents} from "discord.js"
import dotenv from "dotenv"
import {MouseDiscordEvent} from "./events/ready";

dotenv.config()

const nonaId = "627234185870049320"
const yanId = "264510595083141120"

const danger = "⚠️"
const exclamationRed = "❗"
const exclamationWhite = "❕"
const check = "✅"
const question = "❓"
const x = "❌"
const thumbsdown = "👎"
const smallSquare = "◽"
const heart = "❤️"
const sparklHeart = "💖"
const eyebrow = "🤨"
const flushed = "😳"
const rage = "😡"
const pensive = "😔"
const sob = "😭"
const cry = "😢"
const party = "🥳"
const ru_flag = "🇷🇺"
const rat = "🐀"

export class MouseClient extends Client {
    commands: Collection<any, any> = new Collection<any, any>()
}

const client = new MouseClient({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
})

// load commands into client instance.
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.ts'))
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// register handlers for events
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.ts'))
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath) as MouseDiscordEvent<keyof ClientEvents>;

    client.on(event.name, (...args) => event.execute(...args))
}


client.login(process.env.TOKEN)


// async function wait(ms: number) {
//     await new Promise(resolve => setTimeout(resolve, ms));
// }
// client.on("interactionCreate", async (int) => {
//     if (!int.isCommand()) return;
//
//     const {commandName, options} = int
//
//     switch (commandName) {
//         case "ping":
//             await int.deferReply({})
//             await int.editReply({
//                 content: "pong"
//             })
//             await wait(1000)
//             await int.editReply({
//                 content: "pong pong"
//             })
//             await wait(1000)
//             await int.editReply({
//                 content: "pong pong pong"
//             })
//             break;
//         // case "add":
//         //     const a = options.getNumber("num1")!
//         //     const b = options.getNumber("num2")!
//         //     await int.reply({
//         //         content: `Result: ${a + b}`
//         //     })
//         //     break;
//     }
// })
// client.on("messageCreate", async (msg) => {
//     console.log(`Message create in guild '${msg.guild?.name}'\nMessage: '${msg.content}'`)
//
//     if (msg.author.id === yanId)
//     {
//         const nona = await client.users.fetch(nonaId)
//         const chan = msg.channel
//
//         const dangerMsg = await chan.send({
//             content: `${danger} ${exclamationRed}${exclamationRed} **Внимание** ${exclamationRed}${exclamationRed} ${danger}`
//         })
//         await wait(10000)
//         new Promise(async resolve => {
//             for (let i = 0; i < 20; i++) {
//                 await dangerMsg.edit(`${danger} ${exclamationWhite}${exclamationRed} **Внимание** ${exclamationRed}${exclamationWhite} ${danger}`)
//                 await wait(500)
//                 await dangerMsg.edit(`${danger} ${exclamationRed}${exclamationWhite} **Внимание** ${exclamationWhite}${exclamationRed} ${danger}`)
//                 await wait(500)
//             }
//         })
//         await chan.send(`${danger}${danger} Мы заметили подозрительную ${eyebrow} активность в вашем поведении ${danger}${danger}`)
//
//         await wait(2000)
//         const infoMsg = await chan.send(`${x}${x} Ваш аккаунт в Discock и Genshin Impcock был заблокирован, так как вы находитесь на территории Российской ${rage}${thumbsdown} Федерации ${x}${x}`)
//
//         await wait(2000)
//         await chan.send(`${pensive}${cry} Это действие отменить нельзя ${sob}${sob}\n\n`)
//
//         await wait(3000)
//         let loadingText = `\n${question} Собираем о вас информацию `
//         const loadingMsg = await chan.send(loadingText + question)
//         for (let i = 1; i <= 3; i++) {
//             await wait(900)
//             await loadingMsg.edit(loadingText + ".".repeat(i) + " " + question)
//         }
//         await loadingMsg.edit(`\n${exclamationRed} Обрабатываем собранную информацию ${exclamationRed}`)
//         await wait(4000)
//         await loadingMsg.edit(`${flushed} Не могу поверить своим глазам ${flushed}`)
//         await wait(2500)
//         await chan.send(`${flushed} Вы же самый настоящий мыш - ${rat}\n${rat} И у вас еще день варенья! ${party}`)
//
//         await wait(3000)
//         await chan.send(`${check}${check}${check} Мы официально снимаем с вас все ограничения ${check}\n${sparklHeart + heart} И тьмокаем вас в щечку ${heart + sparklHeart}`)
//     }
//     // if (msg.content === "ping")
//     //     msg.reply({
//     //         content: "pong"
//     //     })
// })