'use strict'

const express = require('express')
const productCtrl = require('../controllers/products')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.postProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.post('/signup', userCtrl.singUp)
api.post('/signin', userCtrl.singIn)
api.get('/private', auth, function (req, res) {
  res.status(200).send({
    message: `Tienes acceso`
  })
})

module.exports = api