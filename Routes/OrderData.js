// const express = require('express');
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Orderdate: req.body.order_date });
  let emailId = await Order.findOne({ email: req.body.email });
//   console.log(emailId);

  if (emailId == null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
    //   console.log(error.message);
      res.status(500).send("Server Error");
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => res.json({ success: true }));
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
});


router.post('/myorderDatalist', async (req, res) => {
  try {
      let myData = await Order.findOne({'email': req.body.email});
      if (!myData) {
          res.status(404).json({error: "No order found with the given email"});
      } else {
          res.json({orderData: myData});
      }
  } catch (error) {
      res.status(500).send("Server Error");
  }
});

module.exports = router;


