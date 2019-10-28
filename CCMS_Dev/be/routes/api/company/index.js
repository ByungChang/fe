var createError = require('http-errors');
var { Company, Branch} = require('../../../models');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const logger = require('../../../config/logger');

router.use(express.json())

router.get('/', async (req, res, next) => {
  try{
    logger.method('"/company"에 get실행')
    let result = await Branch.findAll({
      where:{
        isMain: 'Y'
      }},
      {
        include: [{
        model: Branch,
      }],
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })

    logger.method('"/company"에 get실행완료')
    
    await res.send({ companies: result})
  }
  catch(e){
    logger.error('"/company"에 get에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/', async (req, res, next) => {
  logger.method('"/company"에 post실행')
  var query;
  
  const { name, expiredDate, busNumber, address, tel } = req.body
  try {
    const result = await Company.create({
      name
    }, {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })
    var companyId = result.dataValues.id  
    console.log(companyId )
    await Branch.create({
      name : `${name} 본점`,
      expiredDate,
      companyId ,
      busNumber,
      isMain : 'Y',
      address,
      tel,
    }, {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    }).then((r)=>{
      logger.method('"/company"에 post실행완료')
      res.send({ page: true })
    });
  }
  catch (e) {
    logger.error('"/company"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.all('*', function (req, res, next) {
  logger.error('"/company"에 없는 경로')
  next(createError(404, '그런 api 없어'));
});

module.exports = router;