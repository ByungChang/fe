var createError = require('http-errors');
var { User, Board, Board_post, File, Board_file,Board_comment } = require('../../../models');
const express = require('express');
const jwt = require('jsonwebtoken');
//const { isLoggedIn, isNotLoggedIn } = require('../../middlewares');
const router = express.Router();
const logger = require('../../../config/logger');
const fs = require('fs')
const path = require('path');

//파일첨부
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log('dfdf')
    callback(null, "upload/")
  },
  filename: function (req, file, callback) {
    console.log('1111')
    callback(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

router.use('/comment', require('./comment'));
router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    logger.method('"/board"에 get실행')
    let result = await Board.findAll({
      include: [{
        model: Board_post,
      }, {
        model: User,
      }, {
        model: Board_file,
        include: [File]
      }],

      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })
    logger.method('"/board"에 get실행완료')
    await res.send({ posts: result })
  }
  catch (e) {
    logger.error('"/board"에 get에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.post('/fileDown', async (req, res, next) => {
  try {
    console.log(req.body)
    const file = path.join(`${__dirname}`, '../../../', 'upload', req.body.fileName);
    res.download(file);
  } catch (e) {
    console.log(e);
  }
});

router.post('/', upload.any(), async (req, res, next) => {
  try {
    logger.method('"/board"에 post실행')
    const boardResult = await Board.create({
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
      hit: 0,
      boardPostId: req.body.boardPostId,
    }, {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })
    await req.files.forEach(async (file) => {
      let i = 0;
      let fileResult = await File.create({
        orgName: file.originalname,
        size: file.size
      }, {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })

      await Board_file.create({
        boardId: boardResult.id,
        fileId: fileResult.id
      },
        {
          logging: (str) => {
            str = str.substr(21);
            logger.query(str)
          }
        })
    });
    res.send({ page: true })
  }
  catch (e) {
    logger.error('"/board"에 post에서 ERROR' + ' : ' + e)
    res.send({ success: false, msg: e.message })
  }
});

router.put('/', upload.any(), async (req, res, next) => {
  try {
    logger.method('"/board"에 put실행')
    const boardResult = await Board.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: { id: req.body.id }, logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        },
        returning: true
      },
    )
    
    await req.files.forEach(async (file) => {
      let i = 0;
      let fileResult = await File.create({
        orgName: file.originalname,
        size: file.size
      }, {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      })

      await Board_file.create({
        boardId: req.body.id,
        fileId: fileResult.id
      },
        {
          logging: (str) => {
            str = str.substr(21);
            logger.query(str)
          }
        })
    });
    logger.method('"/board"에 put실행완료')
    await res.send({ page: true })
  }
  catch (e) {
    logger.error('"/board"에 put에서 ERROR')
    res.send({ success: false, msg: e.message })
  }
});

router.delete('/', async (req, res, next) => { //이거 다시 하기
  try {
    logger.method('"/board"에 delete실행')
    console.log(req.body)
    await Board_file.destroy({
      where: { boardId : req.body.boardId},
    }, {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })

    await Board_comment.destroy({
      where: { boardId : req.body.boardId},
    }, {
      logging: (str) => {
        str = str.substr(21);
        logger.query(str)
      }
    })

    await Board.destroy(
      {
        where: { id : req.body.boardId},
      }, {
        logging: (str) => {
          str = str.substr(21);
          logger.query(str)
        }
      }
    )
    logger.method('"/board"에 delete실행완료')
    await res.send({ page: true })
  }
  catch (e) {
    logger.error('"/board"에 delete에서 ERROR')
    res.send({ success: false, msg: e.message })
  }
});

router.delete('/fileDel', async (req, res, next) => {
  try {
    logger.method('"/board/fileDel"에 delete실행')
    const files = req.body.files
    console.log(files)
    files.forEach(async (file)=>{
      await Board_file.destroy(
        {
          where: { fileId: file.fileId },
          logging: (str) => { str = str.substr(21); logger.query(str) }
        }
      ).then((r)=>{
        console.log('삭제')
      })
      await File.destroy(
        {
          where: { id: file.id },
          logging: (str) => { str = str.substr(21); logger.query(str) }
        }
      )
    })
    // await Board_file.destroy(
    //   {
    //     where: { fileId: req.body.id },
    //     logging: (str) => { str = str.substr(21); logger.query(str) }
    //   }
    // )
    // await File.destroy(
    //   {
    //     where: { id: req.body.id },
    //     logging: (str) => { str = str.substr(21); logger.query(str) }
    //   }
    // )
    logger.method('"/board/fileDel"에 delete실행완료')
    await res.send({ page: true })
  }
  catch (e) {
    logger.error('"/board/fileDe"에 delete에서 ERROR')
    res.send({ success: false, msg: e.message })
  }
});

router.all('*', function (req, res, next) {
  logger.error('"/board"에 없는 경로')
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
