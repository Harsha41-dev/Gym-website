// controllers/authController.js
import User from '../models/userModel.js';

export const getRegisterPage = (req, res) => {
  res.render('pages/register');
};

export const postRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Basic check if user already exists
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('User already exists');
    }
    // Create new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    return res.redirect('/login');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

export const getLoginPage = (req, res) => {
  res.render('pages/login');
};

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }
    // Store session
    req.session.userId = user._id;
    req.session.role = user.role;

    // Redirect based on role
    if (user.role === 'admin') {
      return res.redirect('/admin/dashboard');
    } else if (user.role === 'trainer') {
      return res.redirect('/trainer/dashboard');
    } else {
      return res.redirect('/user/dashboard');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
