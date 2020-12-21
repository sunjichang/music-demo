// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
const URL = 'http://musicapi.leanapp.cn/personalized'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const playlist = await rp(URL).then(res => {
    return res
  })
  console.log(playlist)
}