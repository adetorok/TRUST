import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Organization from '../models/Organization.js';

export async function register(req, res, next) {
  try {
    const { orgName, orgType, email, name, password } = req.body;
    const org = await Organization.create({ name: orgName, type: orgType });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      orgId: org._id, email, name, passwordHash, roles: ['org_admin','pm']
    });
    const token = jwt.sign({ sub: user._id, orgId: org._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '12h' });
    res.json({ token, user: { id: user._id, email, name, roles: user.roles, orgId: org._id }});
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.compare(password))) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: user._id, orgId: user.orgId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '12h' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, roles: user.roles, orgId: user.orgId }});
  } catch (e) { next(e); }
}
