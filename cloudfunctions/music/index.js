// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise')

const TcbRouter = require('tcb-router')

const db = cloud.database({
  env: 'music-demo-7gzv296j5ff56449'
})

const BASE_URL = 'http://zmap.club:3000'

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event}) 

  app.router('playlist', async (ctx, next) => {
    ctx.body = await db.collection('playlist')
    .skip(event.start)
    .limit(event.count)
    .orderBy('createTime', 'desc')
    .get()
    .then(res => {
      return res
    })
  })

  app.router('musiclist', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId))
    .then((res) => {

      return JSON.parse(res)
    })
  })

  return app.serve()

}