const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const registerUser = asyncHandler(async(req, res) => {
  try{
    const { name, email, password} = req.body

    if(!name || !email || !password) {
      res.status(400).json({message: 'Please add all fields'})
    }
    //user exist

    const userExist = await User.findOne({ email: email })
      if(!userExist){
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //saved user
        const user = new User({ ...req.body, password: hashedPassword })
        const token = generateToken(user._id)
        await user.save()

        res.status(201).json({ message: "successfully created ", data: user, token: token})
      }
      res.status(400).json({ message: 'User already exist'})

  }catch(e){
      res.status(400).send({ message: e.message })
  }
})

const login = asyncHandler(async(req, res) => {

  try{
    const { email, password } = req.body
    //check user by email
    const user = await User.findOne({ email: email })

    if( user && (await  bcrypt.compare(password, user.password ))){
        const token = generateToken(user._id)
        res.status(200).json({message: "Logged in", data: user, token: token})

    }else {
      res.status(400).json({
        message: 'Invalid crendentials'
      })
    }
  }catch(e){
    res.status(400).json({ message: e.message })
  }

})
const getMe = asyncHandler(async(req, res) => {
    try{
      res.status(200).json(req.user)
    }catch(e){
      res.status(400).send({ message: e.message })
    }
})


//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id}, process.env.JWT_SECRET, { expiresIn: '7d'})
}
module.exports = { registerUser, login, getMe}
