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
    await Branch.create({
      name : `${name}`,
      expiredDate,
      companyId ,
      busNumber,
      isMain : 'Y',
      Address:'',
      tel:'',
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

router.post('/user', async (req, res, next) => {
try{
  logger.method('"/company/user"에 post실행')
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
  logger.method('"/company/user"에 post실행완료')
  res.send({users : result})
}
catch(e){
  logger.error('"/company/user"에 post에서 ERROR' + ' : ' + e)
  res.send({ success: false, msg: e.message })
}
});


router.all('*', function (req, res, next) {
  logger.error('"/company"에 없는 경로')
  next(createError(404, '그런 api 없어'));
});

module.exports = router;