const express = require('express');
const router = express.Router();

//@route   GET api/profile  <---the route endpoint
//@desc    Test route     <---what is this?
//@access  Public         <--is this a protected route?

router.get('/', (req, res) => {
  res.send('profile route');
});

module.exports = router;
