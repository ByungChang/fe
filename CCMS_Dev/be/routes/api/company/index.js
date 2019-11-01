var createError = require('http-errors');
var { Company, Branch, Device, Branch_device,User_group } = require('../../../models');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const logger = require('../../../config/logger');

router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    logger.method('"/company"에 get실행')

    let branch = await Branch.findAll({
      where: {
        isMain: 'Y'
      }
    },
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

    await res.send({ companies: branch})
  }
  catch (e) {
    logger.error('"/company"에 get에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.get('/device', async (req, res, next) => {
  try {
    logger.method('"/company/device"에 get실행')

    let device = await Device.findAll(
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })

    logger.method('"/company/device"에 get실행완료')

    await res.send({ device: device })
  }
  catch (e) {
    logger.error('"/company/device"에 get에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/', async (req, res, next) => {
  logger.method('"/company"에 post실행')

  const { name, expiredDate, busNumber, address, tel, devices } = req.body
  console.log(devices)
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
    const branch = await Branch.create({
      name: `${name}`,
      expiredDate,
      companyId,
      busNumber,
      isMain: 'Y',
      Address: '',
      tel: '',
    }, {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })

    await devices.forEach(async (item) => {
      await Branch_device.create({
        deviceId: item.id,
        location: '',
        branchId: branch.id,
        descript: '',
      }, {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
    });

    logger.method('"/company"에 post실행완료')
    res.send({ page: true })
  }
  catch (e) {
    logger.error('"/company"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/user', async (req, res, next) => {
  try {
    logger.method('"/company/user"에 post실행')
    let result = await Branch.findAll({
      where: {
        companyId: req.body.companyId
      }
    },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
    logger.method('"/company/user"에 post실행완료')
    res.send({ users: result })
  }
  catch (e) {
    logger.error('"/company/user"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/userAdd', async (req, res, next) => {
  try {
    logger.method('"/company/userAdd"에 post실행')
    console.log(req.body)
    const {name, expiredDate, companyId, address, tel} = req.body

    let result = await Branch.create({
      name,
      expiredDate,
      companyId,
      busNumber:'',
      isMain:'N',
      address,
      tel
    },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
    logger.method('"/company/userAdd"에 post실행완료')
    res.send({ users: result })
  }
  catch (e) {
    logger.error('"/company/userAdd"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/detail', async (req, res, next) => {
  try {
    logger.method('"/company/detail"에 post실행')
    console.log(req.body)

    const board_device = await Branch_device.findAll({
      branchId : req.body.id,
    },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      }
    )
    console.log(board_device)
    const result = await Device.findAll({
      id : board_device.deviceId,
    },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      }
    )
    console.log(result)
    logger.method('"/company/detail"에 post실행완료')
    res.send({ devices: result })
  }
  catch (e) {
    logger.error('"/company/detail"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.delete('/', async (req, res, next) => { //이거 다시 하기
  try {
    logger.method('"/company"에 delete실행')

    const r = await Branch.findAll({
      where: {companyId: req.body.info[0].cId}
    })

    console.log(req.body.info[0].cId)
    console.log(r)

    await r.forEach(async (item)=>{
      await Branch_device.destroy(
        {
          where: { branchId : item.id},
          logging: (str) => { str = str.substr(21); logger.query(str) }
        }
      )
      
      await User_group.destroy(
        {
          where: { branchId : item.id },
          logging: (str) => { str = str.substr(21); logger.query(str) }
        }
      )

      await Branch.destroy(
        {
          where: { id : item.id },
          logging: (str) => { str = str.substr(21); logger.query(str) }
        }
      )
      await Company.destroy(
        {
          where: { id : req.body.info[0].cId },
          logging: (str) => { str = str.substr(21); logger.query(str) }
        }
      )
    })

    logger.method('"/company"에 delete실행완료')
    await res.send({ page: true })
  }
  catch (e) {
    logger.error('"/company"에 delete에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.all('*', function (req, res, next) {
  logger.error('"/company"에 없는 경로')
  next(createError(404, '그런 api 없어'));
});

module.exports = router;