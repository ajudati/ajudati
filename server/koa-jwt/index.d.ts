declare module "koa-jwt" {
  function jwt(opts);
  namespace jwt{
    function decode (jwt, options);
    function sign(payload, secretOrPrivateKey, options, callback?);
    function verify(jwtString, secretOrPublicKey, options, callback);
  }
  export = jwt;
}