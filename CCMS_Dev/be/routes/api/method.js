const jwt = require('jsonwebtoken');

//토큰유효성 검사
const verifyToken = (t) => {
    return new Promise((resolve, reject) => {
      jwt.verify(t, process.env.JWT_SECRET, (err, v) => {
        if (err) reject(err)
        resolve(v)
      })
    })
  }
  module.exports = {
      verifyToken
  }