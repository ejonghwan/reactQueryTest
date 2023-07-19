import express from 'express';
import User from '../model/user.js';

const router = express.Router();


//@ path    POST /api/user/signup
//@ doc     회원가입 
//@ access  public
router.post('/signup', async (req, res) => {
    try {
        const user = await new User(req.body);
        user.save();
        res.status(201).json(user)
    } catch(err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})


export default router;