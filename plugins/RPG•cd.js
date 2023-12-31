import daily from './RPG•diario.js'
import weekly from './RPG•semanal.js'
import monthly from './RPG•mensual.js'
import adventure from './RPG•aventura.js'

const inventory = {
  others: {
    health: true,
    money: true,
    exp: true,
    cookie: true,
    level: true,
  },
  items: {
    potion: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    emerald: true,
    diamond: true,
    gold: true,
    iron: true,
    upgrader: true,
    pet: true,
  },
  durabi: {
    sworddurability: true,
    pickaxedurability: true,
    fishingroddurability: true,
    armordurability: true,
  },
  tools: {
    armor: {
      '0': '❌',
      '1': 'Leather Armor',
      '2': 'Iron Armor',
      '3': 'Gold Armor',
      '4': 'Diamond Armor',
      '5': 'Emerald Armor',
      '6': 'Crystal Armor',
      '7': 'Obsidian Armor',
      '8': 'Netherite Armor',
      '9': 'Wither Armor',
      '10': 'Dragon Armor',
      '11': 'Hacker Armor'
    },
    sword: {
      '0': '❌',
      '1': 'Wooden Sword',
      '2': 'Stone Sword',
      '3': 'Iron Sword',
      '4': 'Gold Sword',
      '5': 'Copper Sword',
      '6': 'Diamond Sword',
      '7': 'Emerald Sword',
      '8': 'Obsidian Sword',
      '9': 'Netherite Sword',
      '10': 'Samurai Slayer Green Sword',
      '11': 'Hacker Sword'
    },
    pickaxe: {
      '0': '❌',
      '1': 'Wooden Pickaxe',
      '2': 'Stone Pickaxe',
      '3': 'Iron Pickaxe',
      '4': 'Gold Pickaxe',
      '5': 'Copper Pickaxe',
      '6': 'Diamond Pickaxe',
      '7': 'Emerlad Pickaxe',
      '8': 'Crystal Pickaxe',
      '9': 'Obsidian Pickaxe',
      '10': 'Netherite Pickaxe',
      '11': 'Hacker Pickaxe'
    },
    fishingrod: true,

  },
  crates: {
    common: true,
    uncommon: true,
    mythic: true,
    legendary: true,
  },
  pets: {
    horse: 10,
    cat: 10,
    fox: 10,
    dog: 10,
  },
  cooldowns: {
    lastclaim: {
      name: 'Diario',
      time: daily.cooldown
    },
    lastweekly: {
    	name: 'Semanal',
        time: weekly.cooldown
        },
    lastmonthly: {
      name: 'Mensual',
      time: monthly.cooldown
    },
    lastadventure: {
      name: 'Aventura',
      time: adventure.cooldown
    }
  }
}
let handler = async (m, { conn }) => {
let user = global.db.data.users[m.sender]
  const tools = Object.keys(inventory.tools).map(v => user[v] && `${global.rpg.emoticon(v)} ${v}: ${typeof inventory.tools[v] === 'object' ? inventory.tools[v][user[v]?.toString()] : `Level(s) ${user[v]}`}`).filter(v => v).join('\n').trim()
  const items = Object.keys(inventory.items).map(v => user[v] && `${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n').trim()
  const dura = Object.keys(inventory.durabi).map(v => user[v] && `${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n').trim()
  const crates = Object.keys(inventory.crates).map(v => user[v] && `${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n').trim()
  const pets = Object.keys(inventory.pets).map(v => user[v] && `${global.rpg.emoticon(v)} ${v}: ${user[v] >= inventory.pets[v] ? 'Max Levels' : `Level(s) ${user[v]}`}`).filter(v => v).join('\n').trim()
  const cooldowns = Object.entries(inventory.cooldowns).map(([cd, { name, time }]) => cd in user && `*• ${name}*: ${new Date() - user[cd] >= time ? '✅' : '❌'}`).filter(v => v).join('\n').trim()
  let str = `
🧑🏻‍🏫  𝙽𝙾𝙼𝙱𝚁𝙴: ${conn.getName(m.sender)}
${Object.keys(inventory.others).map(v => user[v] && `➔ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n')}${tools ? `
` : ''}${cooldowns ? `
───── *⌛ 𝙲𝙾𝙾𝙻𝙳𝙾𝚆𝙽 ⌛* ─────
${cooldowns}` : ''}
• Mazmorra: ${user.lastdungeon == 0 ? '✅': '❌'}
• Minar: ${user.lastmining == 0 ? '✅': '❌'}
`.trim()
  conn.sendButton(m.chat, `*𝙸𝙽𝚅𝙴𝙽𝚃𝙰𝚁𝙸𝙾*`, str, null, [[`${user.health < 60 ? '𝙲𝚄𝚁𝙰𝚁': '𝙰𝚅𝙴𝙽𝚃𝚄𝚁𝙰'}`,`${user.health < 60 ? '.heal': '.aventura'}`],['ᴘ𝙴𝚁𝙵𝙸𝙻','.perfil']],m)
}
handler.help = ['inventory', 'inv']
handler.tags = ['rpg']
handler.command = /^(cd|cooldown|cooldowns)$/i

handler.register = true
export default handler
