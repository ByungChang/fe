var createError = require('http-errors');
var { Company, Branch} = require('../../../models');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const logger = require('../../../config/logger');

router.use(express.json())

router.get('/', async (req, res, next) => {
  try{
    logger.method('"/company/user"에 get실행')
    let result = await Branch.findAll({
      where:{
        companyId: req.body.companyId
      }},
      {
        logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })

    logger.method('"/company/user"에 get실행완료')
    await res.send({ users: result})
  }
  catch(e){
    logger.error('"/company/user"에 get에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/', async (req, res, next) => {
  
});

router.all('*', function (req, res, next) {
  logger.error('"/company"에 없는 경로')
  next(createError(404, '그런 api 없어'));
});

module.exports = router;