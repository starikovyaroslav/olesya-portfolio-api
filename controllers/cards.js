const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const {
    id,
    image,
  } = req.body;

  Card.create({
    id,
    image,
    owner,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании карточки');
      }
      throw err;
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(new NotFoundError('Фото с указанным id не найдено'))
    .then((card) => card.remove()
      .then(() => res.send({ message: 'Фото удалено' })))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
