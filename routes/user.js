const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/auth");


const router = express.Router();

// router.get("/user", (req, res) => {
//   // req.body
//   res.json({
//     data: "hey you hit user APII endpoint",
//   });
// });
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder
} = require("../controllers/user");

router.post('/user/cart', authCheck, userCart)
router.get('/user/cart', authCheck, getUserCart)
router.delete('/user/cart', authCheck, emptyCart)
router.post('/user/address', authCheck, saveAddress)

router.post('/user/order', authCheck, createOrder)
router.post("/user/cash-order", authCheck, createCashOrder);
router.get('/user/orders', authCheck, orders)

router.post('/user/cart/coupon', authCheck, applyCouponToUserCart)

router.post('/user/wishlist', authCheck, addToWishlist)
router.get("/user/wishlist", authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist)

module.exports = router;
