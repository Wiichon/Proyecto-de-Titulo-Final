import jwt from 'jsonwebtoken';

import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js";

import {TOKEN_SECRET} from '../config.js'

export const register = async (req,res) => {
    
    
    const  {email, password, username} = req.body

    try {
        
        const userFound=await User.findOne({email})
        if(userFound) return res.status(400).json(["Email en uso"])

        const passwordHash = await bcrypt.hash(password, 10)// esto es parte de la encryptacion
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const Usersaved = await newUser.save()
        const token = await createAccessToken({ id: Usersaved._id });
        
        res.cookie("token",token)
        res.json({
            id: Usersaved. _id,
            username: Usersaved.username,
            email: Usersaved.email,
        })


    } catch (error) {
        console.log(error)
    }
};

export const login = async (req,res) => {
    
    const  {email, password} = req.body
    try {
        const userFound= await User.findOne({email})

        if(!userFound) return res.status(400).json({message:"Usuario no encontrado"});

        const isMatch = await bcrypt.compare(password, userFound.password)// esto es parte de la encryptacion
        if(!isMatch) return res.status(400).json({message:"Contraseña incorrecto"});
        

        const token = await createAccessToken({ id: userFound._id });
        
        res.cookie("token", token, {
           

        });
        res.json({
            id: userFound. _id,
            username: userFound.username,
            email: userFound.email,
        })


    } catch (error) {
        console.log(error)
    }
};

export const logout =async (req,res) =>{
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200)
};

export const profile=async (req,res) =>{
    const userFound= await User.findById(req.user.id)
    if(!userFound)return res.status(400).json({message:"Usuario no encontrado"});
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
    })
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };