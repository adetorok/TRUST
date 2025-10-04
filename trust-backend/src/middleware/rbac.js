export function allow(...allowed) {
  return (req, res, next) => {
    const roles = req.user?.roles || [];
    if (roles.includes('system_admin')) return next();
    const ok = roles.some(r => allowed.includes(r));
    if (!ok) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}