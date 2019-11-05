var createError = require('http-errors');
var { Company, Branch, Device, Branch_device,User_group,User } = require('../../../models');
const express = require('express');
const {verifyToken} = require('../method')
const router = express.Router();
const logger = require('../../../config/logger');

router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    logger.method('"/company"에 get실행')
    const token = req.headers.authorization
    await verifyToken(token).then(async (r)=>{
      const branch = await Branch.findAll({
        where: {
          isMain: 'Y'
        },
        include: [{
          model: User_group,
          include: [User]
        }],
      },
      {
        
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })

      let i =0
      await branch.forEach(async (item) => {
        const branchs = await Branch.findAll({
          where:{companyId : item.companyId},
          include: [{
            model: User_group,
            include: [User]
          }],
        }, {
          logging: (str) => {
            str = str.substr(21);
            logger.query(str)
          }
        })
        

        const branch_devices = await Branch_device.findAll({
          where:{branchId : item.id}
        }, {
          logging: (str) => {
            str = str.substr(21);
            logger.query(str)
          }
        })
        item.dataValues.userNum = branchs.length
        item.dataValues.hvNum = branch_devices.length
        
        item.dataValues.state = item.dataValues.user_groups[0].users[0].userYn
        item.dataValues.email = item.dataValues.user_groups[0].users[0].orgId
        
        if(i === branch.length - 1){
          logger.method('"/company"에 get실행완료')
          res.send({ success : true , companies: branch})
        }
        i++
      })
    });
  }
  catch (e) {
    logger.error('"/company"에 get에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.get('/getInfo', async (req,res,next)=>{
  try{
    const token = req.headers.authorization
    logger.method('"/company/getInfo"에 get실행')
      await verifyToken(token).then(async (r)=>{
        const user = await User.findOne(
        {
          where : {id : r.id},
          include: [{
            model: User_group,
            include: [Branch]
        }],},
        {
            logging: (str) => {
            str = str.substr(21);
            logger.query(str)
          }
        })
        const auth = user.dataValues.user_group.dataValues.groupAuth
        const cId = user.dataValues.user_group.dataValues.branch.dataValues.companyId
        
        logger.method('"/company/getInfo"에 get실행완료')
        await res.send({ success: true, auth, cId })
      })
  }
  catch(e){
    logger.error('"/company/getInfo"에 get에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
})

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

router.post('/userDevice', async (req, res, next) => {
  try {
    logger.method('"/company/userDevice"에 post실행')
    const devices = await Branch_device.findAll(
      {where : {branchId : req.body.companyId}},
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })

    var device = []
    var i =0
    await devices.forEach(async (item)=>{
      const result = await Device.findOne(
        {where : {id : item.deviceId}},
        {
          logging: (str) => {
            str = str.substr(21);
            logger.query(str)
          }
        })
      device.push(result)
      if(i === devices.length - 1){
        logger.method('"/company/userDevice"에 post실행완료')
        await res.send({ device: device })
      }
      i++
    })
    
  }
  catch (e) {
    logger.error('"/company/userDevice"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/', async (req, res, next) => {
  logger.method('"/company"에 post실행')

  const { name, expiredDate, busNumber, address, tel, devices, email, state } = req.body
  
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

    const group = await User_group.create({
      name: name,
      groupAuth : 'company',
      branchId : branch.id
    }, {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })

    console.log(state)

    await User.create({
      orgId: email,
      userNm : name,
      userPw:'1234',
      userYn:state,
      userGroupId:group.id
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

router.put('/', async (req, res, next) => {
  logger.method('"/company"에 put실행')

  const { cId, name, expiredDate, busNumber, address, tel, devices } = req.body
  
  try {
    await Company.update(
      {
        name : name
      },
      {
        where: { id : cId }, logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        },
        returning: true
      },
    )
    
    const find = await Branch.findOne(
      {
        where : {companyId : cId}
      }, {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      }
    )
    
    await Branch.update(
    {
      name: `${name}`,
      expiredDate,
      address: '',
      tel: '',
      busNumber : busNumber
    },{
      where:{id:find.id}},
    {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })
    
    await Branch_device.destroy({
      where: { branchId : find.id},
    }, {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })
    
    await devices.forEach(async (item) => {
      
      await Branch_device.create(
      { 
        name : item.name, 
        branchId : find.id,
        deviceId : item.id,
        location : '',
        descript : ''
      },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
    })

    logger.method('"/company"에 put실행완료')
    res.send({ page: true })
  }
  catch (e) {
    logger.error('"/company"에 put에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.put('/user', async (req, res, next) => {
  logger.method('"/company/user"에 put실행')

  const { branchId, name, expiredDate, busNumber, address, tel, devices } = req.body
  
  try {
    const find = await Branch.findOne(
      {
        where : {id : branchId}
      }, {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      }
    )
    
    await Branch.update(
    {
      name: `${name}`,
      expiredDate,
      address: address,
      tel: tel,
    },{
      where:{id:find.id}},
    {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })
    
    await Branch_device.destroy({
      where: { branchId : find.id},
    }, {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })
    
    await devices.forEach(async (item) => {
      await Branch_device.create(
      { 
        name : item.name, 
        branchId : find.id,
        deviceId : item.id,
        location : '',
        descript : ''
      },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
    })

    logger.method('"/company"에 put실행완료')
    res.send({ page: true })
  }
  catch (e) {
    logger.error('"/company"에 put에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.put('/state', async (req, res, next) => {
  logger.method('"/company/state"에 put실행')

  const { id, state} = req.body
  console.log(id)
  try {
    const find = await User_group.findOne({
      where: {
        branchId : id
      }
    },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
    
    await User.update(
      {userYn : state},
      {where : {userGroupId : find.id}},
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      }
    ) ///////////////////////////////기업 블락하면 유저도 다 블락하는데 다시 액티브하면 이전상태 어떻게????
    
    logger.method('"/company/state"에 put실행완료')
    res.send({ page: true })
  }
  catch (e) {
    logger.error('"/company/state"에 put에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/edit', async (req, res, next) => {
  logger.method('"/company/edit"에 post실행')

  try {
    const result = await Branch.findOne({
      where: {
        companyId : req.body.id
      }
    },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
    logger.method('"/company/edit"에 post실행완료')
    res.send({ busNum: result.busNumber })
  }
  catch (e) {
    logger.error('"/company/edit"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/editDevice', async (req, res, next) => {
  logger.method('"/company/editDevice"에 post실행')

  try {
    const branch_device = await Branch_device.findAll({
      where: {
        branchId : req.body.branchId
      }
    },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
    
    var result=[]
    var i = 0
    branch_device.forEach(async (item)=>{
      const device = await Device.findOne({
        where: {
          id : item.deviceId
        }
      },
        {
          logging: (str) => {
            str = str.substr(21);
            logger.query(str)
          }
        })
      result.push(device)
      if(i === branch_device.length - 1){
        console.log(result)
        logger.method('"/company/editDevice"에 post실행완료')
        res.send({ result: result })
      }
      i++
    })
  }
  catch (e) {
    logger.error('"/company/editDevice"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/user', async (req, res, next) => {
  try {
    logger.method('"/company/user"에 post실행')
    let branch = await Branch.findAll({
      where: {
        companyId: req.body.companyId
      },
      include: [{
        model: User_group,
        include: [User]
      }],
    },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
    

    let i =0
    await branch.forEach(async (item) => {
      //console.log(item.dataValues.state = item.dataValues.user_groups[0].users[0].userYn)
      const branch_devices = await Branch_device.findAll({
        where:{branchId : item.id}
      }, {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })

      item.dataValues.hvNum = branch_devices.length //이거만 되면 화면에 나옴  [ 함수내에서는 변수 갱신이 안됨 ]
      item.dataValues.state = item.dataValues.user_groups[0].users[0].userYn
      item.dataValues.email = item.dataValues.user_groups[0].users[0].orgId
      
      if(i === branch.length - 1){
        logger.method('"/company/user"에 post실행완료')
        res.send({ users: branch})
      }
      i++
    })
  }
  catch (e) {
    logger.error('"/company/user"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/userAdd', async (req, res, next) => {
  try {
    logger.method('"/company/userAdd"에 post실행')
    const {name, expiredDate, companyId, address, tel, devices, email, state} = req.body
    console.log(email,state)
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
      console.log('a')
      const group = await User_group.create({
        name: name,
        groupAuth : 'user',
        branchId : result.id
      }, {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
      console.log('b')
      await User.create({
        orgId: email,
        userNm : name,
        userPw:'1234',
        userYn:state,
        userGroupId:group.id
      }, {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
      console.log('c')
      await devices.forEach(async (item) => {
        const r =await Branch_device.create({
          deviceId: item.id,
          location: '',
          branchId: result.id,
          descript: '',
        }, {
          logging: (str) => {
            str = str.substr(21);
            logger.query(str)
          }
        })
        console.log('d')
      });

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

    const board_device = await Branch_device.findAll({
      where: {branchId: req.body.id}
    },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      }
    )
    
    var result = []
    var i = 0
    await board_device.forEach(async (item)=>{
      console.log('aaa')
      let device = await Device.findAll({
        where : {id : item.deviceId}
      },
      {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })
      await result.push(device)
      if(i == board_device.length - 1){
        logger.method('"/company/detail"에 post실행완료')
        res.send({ devices: result })
      }
      i++
    });
    if(board_device.length === 0)
      res.send({ devices: [] })
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

router.delete('/user', async (req, res, next) => { //이거 다시 하기
  try {
    logger.method('"/company/user"에 delete실행')

    await Branch_device.destroy(
      {
        where: { branchId : req.body.info[0].id},
        logging: (str) => { str = str.substr(21); logger.query(str) }
      }
    )

    await User_group.destroy(
      {
        where: { branchId : req.body.info[0].id },
        logging: (str) => { str = str.substr(21); logger.query(str) }
      }
    )

    await Branch.destroy({
      where: {id: req.body.info[0].id}
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