//=========================================================================================
const Discord = require('discord.js');               //เรียกใช้งาน Library ที่จำเป็น
const client = new Discord.Client();                    //เรียกใช้งาน Client จาก Discord's Library
const {RichEmbed} = require('discord.js');
//=========================================================================================
//Variable

token = process.env.TOKEN;
const embed = new RichEmbed()   //set new RichEmbed
var px = '!';                   //set default prefix
var version = '0.1.1'
var auth = process.env.auth   //set Authen Bot ID
var annCh = process.env.annCh    //set Annoucement Channel ID

//=========================================================================================
//ล็อกอิน
client.login(token)

//แจ้งเตือนยัง Console Log เมื่อเริ่มทำงาน
client.on("ready", () => {
    let embed_ready = embed
    embed_ready
        .setTitle('**DICE** : Annoucement :loudspeaker:')
        .setDescription (`**Name** : \`DICE 🎲\` \n**Version** : \`${version}\`\n**Status** : \`Online!\`\n**Prefix** : \`${px}\`\n\nHelp Command :` + '`' + px +'help`')
        .setFooter('Created by SABER')
        .setColor(0xffb399)
    ;
    client.channels.get(annCh).send(`@everyone`,embed_ready)
})

//=========================================================================================

//On System
client.on('message', msg =>{
    if (!msg.guild || msg.author.bot || !msg.content.startsWith(px)) return;
    if (msg.content.startsWith(`${px}`)){
        let cmd_arr = msg.content.toLowerCase().split(` `);
        let cmd = cmd_arr[0].split(`${px}`)[1];              //get Command
        if (cmd !== '') {

            //Help Command
            if (cmd === 'h'|| cmd === 'help'){
                cmd = '';
                let embed_help = embed
                embed_help
                    .setColor(0xffb399)
                    .setTitle('__**คำสั่งที่มี!**__')
                    .setDescription('\n\n**r , roll** => สุ่มตัวเลข\n ')
                ;
                msg.channel.send(embed)
                cmd = '';
                embed_help = embed;
            }

            //roll Command
            if (cmd === 'r' || cmd === 'roll'){
                cmd='';

                let embed_roll = embed
                embed_roll
                    .setColor(0xffb399)
                    .setTitle('__**คำสั่งผิดพลาด!**__')
                    .setDescription('กรุณาทำตามคำแนะนำดังนี้ . .\n\n**/r** <ครั้ง> **d** <ค่าสูงสุด> หรือ\n**/roll** <ครั้ง> **d** <ค่าสูงสุด>\n\n  และหากต้องการ **บวกหรือลบ** ค่า\nก็สามารถใส่ **+/-** <ค่าที่ต้องการ> ตามหลังได้เลย')
                ;
                roll = cmd_arr[1]
                if (!roll) return msg.channel.send(embed_roll);

                if (/d/gi.test(roll)){
                    if (/[0-9]+d[0-9]+/gi.test(roll)){
                        if (/[0-9]+/gi.test(cmd_arr[2])){
                            let arr = roll.toLowerCase().split('d');
                            ext = Number(cmd_arr[2])

                            if (!(isNaN(ext+1))){
                                temp = 0;
                                result = 0;
                                result_arr = [];
                                for (let i = 0; i < arr[0]; i++) {
                                    temp = randN(1,arr[1])
                                    temp_p = temp + ext
                                    result = result + temp_p;
                                    result_arr.push(temp_p)
                                }
                                msg.channel.send(`**Rolled** : ${result_arr.join(', ')}` + '** Sum : ** `' + result + '`')
                            } else {msg.channel.send(embed_roll)}
                        } else {
                            let arr = roll.toLowerCase().split('d')
                            temp = 0;
                            result = 0;
                            result_arr = [];
                            for (let i = 0; i < arr[0]; i++) {
                                temp = randN(1,arr[1])
                                result = result + temp;
                                result_arr.push(temp)
                            }
                            msg.channel.send(`**Rolled** : ${result_arr.join(', ')}` + '** Sum : ** `' + result + '`')
                        }
                    } else {
                        msg.channel.send(embed_roll)
                    }
                } else if (/[0-9]+/gi.test(cmd_arr[1])){
                    if (/[0-9]+/gi.test(cmd_arr[2])){
                        ext = Number(cmd_arr[2])
                        if (!(isNaN(ext+1))){
                            result = randN(1,roll) + ext
                            msg.channel.send('**Rolled** : '+`${result}`)
                        }
                    } else {
                        msg.channel.send('**Rolled** : '+`${randN(1,roll)}`)
                    }
                } else return msg.channel.send(embed_roll);

            }
            
            //Prefix command
            if (msg.author.id = auth) {
                if (cmd === 'prefix' || cmd === 'px'){ //prfix
                    cmd = '';
                    let embed_prefix = embed
                    embed_prefix
                        .setColor(0xffb399)
                        .setTitle('__**คำสั่งผิดพลาด!**__')
                        .setDescription('กรุณาทำตามคำแนะนำดังนี้ . .\n\n**/prefix** **--c** <prefix ที่ต้องการ>        เพื่อกำหนด Prefix ตามที่ต้องการ"\n**/prefix** **--r**              เพื่อกำหนด Prefix เป็นค่าเริ่มต้น')
                    ;

                    if (cmd_arr[1] === '--c'){ //change
                        if (!cmd_arr[2]){
                            msg.channel.send('**Prefix can not be ** "VOID"')
                        } else {
                            px = cmd_arr[2]
                            msg.channel.send('prefix was changed to `' + px + '`')
                        }
                    } else if (cmd_arr[1] === '--r'){ //recovery
                        px = '!';
                        msg.channel.send('prefix was recovered to `' + px + '`')
                    } else {msg.channel.send(embed_prefix)}
                }
            } else {msg.reply("คุณไม่สามารถใช้คำสั่งนี้ได้");}

            if (!cmd) return;
        }
    }   
})

//random Function
function randN(min,max) {
    return Math.round(Math.random() * (max - min) + min);
}
