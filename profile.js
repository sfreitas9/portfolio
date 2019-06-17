const express = require('express');
const router = express.Router();

//middleware for this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//define home page route, regular way
// router.get('/', (req, res) => {
//   res.send('Hello world');
// });

//define home page route, chaining verbs together
router.route('/')
  .get(function (req, res) {
    res.send('My home page')
  })
  .post(function (req, res) {
    // code to handle ...
    res.send('A project was added')
  })
  .put(function (req, res) {
    // code to handle ...
    res.send('A project was added')
  })
  .delete(function (req, res) {
    // code to handle ...
    res.send('A project was deleted')
  });


//define the about route
router.get('/about', (req, res) => {
  res.send('About me');
})

module.exports = router;