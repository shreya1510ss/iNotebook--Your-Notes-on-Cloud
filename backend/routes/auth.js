const express = require('express');
const User = require('../models/Userr');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const fetchuser=require('../middleware/fetchuser');

const jwt = require('jsonwebtoken');




const JWT_SECRET='harryisagoodb$oy '

//ROUTE 1: Create a user: POST "/api/auth/createuser". no login required
router.post('/createuser', 
  [
    // Validate name field
    body('name').isLength({ min: 3 }).withMessage('Name is required'),
    
    // Validate email field
    body('email').isEmail().withMessage('Email is not valid'),
    
    // Validate password field
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],

  async (req, res) => {
    // Check for validation errors
    //if there are errors return bad request and the errors

    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, process the request
    // Access validated data using req.body
    const salt=await bcrypt.genSalt(10);

    var secPass= await bcrypt.hash(req.body.password, salt);

    try {
      const user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      });

      const data={
        user:{
            id:user.id
        }
      }

      const authtoken=jwt.sign(data,JWT_SECRET);
    //   console.log(jwtData);
       
    success=true
       res.json({success,authtoken});

    } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
        // Duplicate key error (e.g., duplicate email)
        console.error('Duplicate key error:', error.message);
        return res.status(400).json({success, error: 'User Already exists' });
      } else {
        // Other errors
        console.error('Error creating user:', error.message);
        return res.status(500).json({success, error: 'Internal Server Error' });
      }
    }
  }
);



//Route 2: Authenticate a user: Post "/api/auth/login". no login required

router.post('/login', 
  [
    
    // Validate email field
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').exists().withMessage('password cannot be blank'),
 
  ],
  async (req,res)=>{

    let success=false

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const {email,password}=req.body;

    try{
        let user=await User.findOne({email});
        if(!user){
           
            return res.status(400).json({success,error:"try to use the correct credentials"});
        }

        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
          
          
            return res.status(400).json({success,error:"try to use the correct credentials"});
        }

        const data={
            user:{
                id:user.id
            }
          }


          const authtoken=jwt.sign(data,JWT_SECRET);
          //   console.log(jwtData);

            success=true
      
             res.json({success,authtoken});
      
         

    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send("Internal server error occured");


    }

  }

 
);


//Route 3: get logged in user detail using: POST "/api/auth/getuser".LoginRequired

router.post('/getuser', fetchuser, async (req,res)=>{
try {
   var  userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
    
}
})





module.exports = router;
