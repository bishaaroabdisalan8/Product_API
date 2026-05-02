const Product = require('../models/productModel');


// ✅ CREATE PRODUCT
const createProduct = async (req, res) => {
  const { name, price, featured, company } = req.body;

  if (!name || !price || !company) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {
    const product = await Product.create({
      name,
      price,
      featured,
      company
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });

  } catch (error) {
    console.error('Error creating product:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ UPDATE PRODUCT
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, featured, company } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { name, price, featured, company },
      {
        returnDocument: 'after',
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });

  } catch (error) {
    console.error('Error updating product:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ DELETE PRODUCT
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error fetching product:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ GET ALL PRODUCTS (with filters)
const getAllProducts = async (req, res) => {
  const { name, price, featured, company } = req.query;

  let query = {};

  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }

  if (price) {
    query.price = { $lte: Number(price) };
  }

  if (featured) {
    query.featured = featured === 'true';
  }

  if (company) {
    query.company = { $regex: company, $options: 'i' };
  }

  try {
    const products = await Product.find(query).lean();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error('Error fetching products:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts
};