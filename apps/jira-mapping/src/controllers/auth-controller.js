const authService = require('../services/auth-service');

const authorize = async (req, res) => {
  const { userId, backToUrl } = req.session;
  const authorizationUrl = authService.getAuthorizationUrl(userId, backToUrl);
  return res.redirect(authorizationUrl);
};

const callback = async (req, res) => {
  const { userId } = req.params;
  const { code, state: backToUrl } = req.query;

  try {
    const token = await authService.getToken(code);
    return res.redirect(backToUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
};

module.exports = {
  authorize,
  callback,
};
