'use strict';

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services')

function singUp(req, res) {
  console.log('Register User')
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });

  user.save((err) => {
    if (err) {
      res.status(500).send({
        message: `error al crear el usuario ${err}`
      })
    }
    return res.status(200).send({
      token: service.createToken(user)
    });
  });
}

function singIn(req, res) {
  User.find({
    email: req.body.email
  }, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: err
      });
    }
    if (!user) {
      return res.status(400).send({
        message: 'The user does not exist'
      });
    }
    req.user = user;
    res.status(200).send({
      message: 'You are login',
      token: service.createToken(user)
    })
  })
}

module.exports = {
  singUp,
  singIn
}