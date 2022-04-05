const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use('*', () => {
  throw new NotFoundError('Данная страница не существует');
});

module.exports = router;
