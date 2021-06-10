const Sub = require("../models/sub");
const Product = require('../models/product')
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = await new Sub({ name, slug: slugify(name), parent }).save();
    res.json(category);
  } catch (error) {
    res.status(400).send("Create sub failed");
  }
};
exports.list = async (req, res) =>
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({subs: sub})
  .populate('category')
  .exec()
  // console.log(sub)
  res.json({
    sub,
    products
  });
};
exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parent },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (error) {
    res.status(400).send("Sub update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndRemove({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Sub delete failed");
  }
};
