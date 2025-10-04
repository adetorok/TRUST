import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function auth(req, res, next) {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/, '');
    if (!token) return res.status(401).json({ error: 'No token' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user || !user.active) return res.status(401).json({ error: 'Invalid user' });
    req.user = { id: user._id, orgId: user.orgId, roles: user.roles };
    next();
  } catch (e) { next(e); }
}
