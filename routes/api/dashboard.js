const express = require('express');
const router = express.Router();

/**@route test Get login API
 * @desc test login api
*/
router.get('/tes', (req, res)=>{
    res.json({
        message: "Login routes success"
    })
})

module.exports = router;