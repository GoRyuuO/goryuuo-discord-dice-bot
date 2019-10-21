//=========================================================================================
const Discord = require('discord.js')               //เรียกใช้งาน Library ที่จำเป็น
const bot = new Discord.Client()                    //เรียกใช้งาน Client จาก Discord's Library
//=========================================================================================
//Variable

token = process.env.TOKEN
px = process.env.prefix

//=========================================================================================
//Random function
function Random_Num (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

//ล็อกอิน
bot.login(token)

//แจ้งเตือนยัง Console Log เมื่อเริ่มทำงาน
bot.on("ready", () => {
    console.log("I'm Ready now!!")
})

//=========================================================================================

//ระบบสุ่มลูกเต๋า "/r <ครั้ง> d <ค่าสูงสุด>" => Rolled : <result_arr> | Sum : <Result>
bot.on("message", (msg) => {
    if (msg.content.startsWith(`${px}r`)) {
        let roll = msg.content.split(" ")[1]
        if (!roll) return msg.channel.send("คำสั่งผิดพลาด")

        if (/d/gi.test(roll)) { //รับค่า
            if (/[0-9]+d[0-9]+/gi.test(roll)) {  // "/r 3d4"
                let arr = roll.toLowerCase().split("d") 
                let result = 0
                let result_arr = []

                for (let i = 0; i < arr[0]; i++) {
                    let temp = Random_Num(1, arr[1])
                    result = result + temp
                    result_arr.push(temp)
                }
                msg.channel.send(`**Rolled** : ${result_arr.join(", ")} | **Sum** : ${result}`)
            } 
        } else {
            msg.channel.send(`Rolled : ${Random_Num(1, roll)}`)
        }
    }
})

//=========================================================================================
