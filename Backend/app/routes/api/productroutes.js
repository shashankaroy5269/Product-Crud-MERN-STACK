const express=require('express');
const ProductController = require('../../controller/api/ProductController');
const ProductImage = require('../../utils/fileUpload');
const router=express.Router();


router.post('/create/product',ProductImage.single('image'),ProductController.createProduct)
router.get('/product',ProductController.getProduct)
router.get('/product/:id',ProductController.getsingleProduct)
router.put('/product/update/:id',ProductImage.single('image'),ProductController.updateProduct)
router.delete('/product/delete/:id',ProductController.deleteProduct)
router.get('/soft-delete/:id',ProductController.softDeleteProduct);
router.get('/trash', ProductController.getTrashProduct);
router.get('/restore/:id',ProductController.restoreProduct);


module.exports=router;  