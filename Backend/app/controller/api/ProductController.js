const Product = require("../../models/product");
const StatusCode = require("../../utils/statusCode");

class ProductController {

  async createProduct(req, res) {
    try {
       
      const {
        productName,
        productPrice,
        desc,
        brand,
        size,
        color
      } = req.body;

      const product = new Product({
        productName,
        productPrice,
        desc,
        brand,
        size,
        color
      });

      if (req.file) {
        product.image = req.file.path;
      }

      const data = await product.save();

      return res.status(StatusCode.CREATED).json({
        status: true,
        message: "Product created successfully",
        data
      });

    } catch (error) {
       console.log(error.message);
       console.log(error)
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      
       
        
      });
    }
  }

  async getProduct(req, res) {
    try {

      const products = await Product.find({
        isdeleted: false
      });

      return res.status(StatusCode.SUCCESS).json({
        status: true,
        total: products.length,
        message: "Product fetched successfully",
        data: products
      });

    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "Something went wrong",
        error
      });
    }
  }

  async getsingleProduct(req, res) {
    try {

      const id = req.params.id;

      const product = await Product.findById(id);

      return res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "Single product fetched successfully",
        data: product
      });

    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "Something went wrong",
        error
      });
    }
  }

  async updateProduct(req, res) {
    try {

      const id = req.params.id;

      const updateData = {
        ...req.body
      };

      if (req.file) {
        updateData.image = req.file.path;
      }

      const product = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      return res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "Product updated successfully",
        data: product
      });

    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "Something went wrong",
        error
      });
    }
  }

  async softDeleteProduct(req, res) {
    try {

      const id = req.params.id;

      await Product.findByIdAndUpdate(id, {
        isdeleted: true
      });

      return res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "Product moved to trash successfully"
      });

    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "Something went wrong",
        error
      });
    }
  }

  async getTrashProduct(req, res) {
    try {

      const products = await Product.find({
        isdeleted: true
      });

      return res.status(StatusCode.SUCCESS).json({
        status: true,
        total: products.length,
        data: products
      });

    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "Something went wrong",
        error
      });
    }
  }

  async restoreProduct(req, res) {
    try {

      const id = req.params.id;

      await Product.findByIdAndUpdate(id, {
        isdeleted: false
      });

      return res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "Product restored successfully"
      });

    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "Something went wrong",
        error
      });
    }
  }

  async deleteProduct(req, res) {
    try {

      const id = req.params.id;

      await Product.findByIdAndDelete(id);

      return res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "Product deleted successfully"
      });

    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "Something went wrong",
        error
      });
    }
  }
}

module.exports = new ProductController();