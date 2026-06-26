const express=require('express');
const ProductController = require('../../controller/api/ProductController');
const ProductImage = require('../../utils/fileUpload');
const Auth = require('../../middleware/auth');
const router=express.Router();



router.get('/test', (req, res) => {
  res.json({
    status: true,
    message: "Test route working"
  });
});
router.delete('/product/delete/:id',ProductController.deleteProduct)
router.get('/soft-delete/:id',ProductController.softDeleteProduct);
router.get('/trash', ProductController.getTrashProduct);
router.get('/restore/:id',ProductController.restoreProduct);
router.get('/product',ProductController.getProduct)



// router.use(Auth)
router.post('/create/product',Auth,ProductImage.single('image'),ProductController.createProduct)
router.put('/product/update/:id',Auth,ProductImage.single('image'),ProductController.updateProduct)
router.get('/product/:id',Auth,ProductController.getsingleProduct)

module.exports=router;  