const express=require('express');
const router = express.Router();
const {search}=require('../controllers/search.js');
router.get('/',search);
module.exports=router;