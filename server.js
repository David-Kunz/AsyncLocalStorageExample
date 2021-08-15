const express = require('express')
const app = express()
const port = 3000

const { AsyncLocalStorage } = require('async_hooks')

const asyncLocalStorage = new AsyncLocalStorage()

const performEvenMoreWork = async () => {
  // performing even more work
  console.log('performing work for', asyncLocalStorage.getStore())
}

const performSomeWork = async () => {
  // performing some work
  await performEvenMoreWork()
}

let reqId = 0
app.get('/', async (req, res) => {
  reqId++
  asyncLocalStorage.run(reqId, async () => {
    await performSomeWork()
    res.sendStatus(200)
  })
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
