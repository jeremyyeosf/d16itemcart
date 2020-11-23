// Install libraries
const express = require('express')
const cors = require('cors')

const cart = [
    { id: 'abc', item: 'apple', quantity: 10 },
    { id: 'def', item: 'orange', quantity: 10 },
    { id: 'ghi', item: 'pear', quantity: 10 },
    { id: 'jkl', item: 'grapes', quantity: 5 }
]

// configure the environment variable
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create an instance of express
const app = express()

// Add CORS header to the response
app.use(cors())
app.use(express.json())

// create resources
// GET /cart
app.get('/cart', (req, resp) => {
    resp.status(200)
    resp.type('application/json')
    resp.json(cart)
})

// GET /cart/:id
app.get('/cart/:id', (req, resp) => {
    const id = req.params['id']
    const item = cart.find(i => i.id == id)

    resp.type('application/json')
    if (undefined == item) {
        resp.status(404)
        resp.json({})
        return
    }

    resp.status(200)
    resp.json(item)
})

// PUT /cart/:id
app.put('/cart/:id', (req, resp) => {
    const id = req.params['id']
    const payload = req.body

    console.info('>>> payload: ', payload)
    const idx = cart.findIndex(i => i.id == payload.id)
    if (idx < 0)
        cart.push(payload)
    else
        cart[idx] = payload

    resp.status(200)
    resp.type('application/json')
    resp.json({})
    console.log('currentCart: ', cart)
})

// DELETE /cart/:id
app.delete('/cart/:id', (req, resp) => {
    const id = req.params['id']
    const idx = cart.findIndex(i => i.id == id)
    console.info('>>> idx: ', idx)
    if (idx < 0) {
        return "No such item found"
    } else {
        cart.splice(idx, 1)
        
    }
    // const idx = cart.indexOf(id)
    // console.info('>>> idx: ', idx)
    // if (idx > -1)
    // delete cart[idx]
    

    resp.status(200)
    resp.type('application/json')
    resp.json({})
    console.log('currentCart: ', cart)
})

// POST /cart/:id
app.post('/cart/:id', (req, resp) => {
    const id = req.params['id']
    const payload = req.body
    const idx = cart.findIndex(i => i.id == payload.id)
    // if same id but different item name?
    console.info('>>> payload: ', payload)
    
    // if id matches, add quantity
    console.info('>>> idx: ', idx)
    // if no id match, push item into cart
    // if idx < 0 means if item.id not found, add item to cart
    // if item.id is found, if item.name is different, say same id but different itemif item.name is the same, add quantity instead
    if (idx > -1 && cart[idx].item == payload.item) {
        cart[idx].quantity = cart[idx].quantity + payload.quantity
    } else if (idx > -1 && cart[idx].item != payload.item) {
        console.log("Same id but different item-name found, item not added")
    } else {
        cart.push(payload)
    }

    // if (idx < 0 && cart[idx].item !== payload.item) {
    //     return "Same id but different item-name found, item not added"
    // } else if (idx < 0 && cart[idx].item === payload.item) {
    //     cart.push(payload)
    // } else {
    //     cart[idx].quantity = cart[idx].quantity + payload.quantity
    // }

    resp.status(200)
    resp.type('application/json')
    resp.json({})
    console.log('currentCart: ', cart)
})


// start the app
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})