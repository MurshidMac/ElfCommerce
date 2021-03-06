'user strict';

const md5 = require('md5');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { MySQL } = require('../db');
const { UnauthorisedError } = require('../exceptions');
require('dotenv').load();

const { host, user, password, database, tokenSecret } = process.env;
var db = new MySQL(host, user, password, database);

function OAuth2Request(username, password, grantType, scope) {
  this.username = username || '';
  this.password = password || '';
  this.grantType = grantType || '';
  this.scope = scope || '';
}

function OAuth2Response(code, accessToken, refreshToken) {
  this.userCode = code;
  this.accessToken = accessToken;
  this.refreshToken = refreshToken;
}

OAuth2Request.prototype.auth = function() {
  return new Promise((resolve, reject) => {
    db.query(
      `select code, password, salt, token, urt.status as tokenStatus, su.store_id as storeCode
       from user
       left join user_refresh_token as urt on user.code = urt.user_id
       left join store_user as su on user.code = su.user_id
       where email='${this.username}' and user.status=1 and su.status=1`,
      (error, results) => {
        // Check if account is valid and active
        if (error || results.length == 0) {
          reject(new UnauthorisedError('Not authorised.'));
        } else {
          const {
            code,
            password,
            salt,
            token,
            tokenStatus,
            storeCode,
          } = results[0];

          if (password === md5(`${this.password + salt}`)) {
            // If password matched then generating new access token
            const accessToken = jwt.sign(
              {
                data: {
                  code,
                  storeCode,
                  expiry: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                },
              },
              tokenSecret
            );

            db.query(
              `insert into user_access_token(token, user_id, expired_on) values('${accessToken}', '${code}', '${moment
                .utc()
                .add(1, 'hour')
                .format('YYYY-MM-DD HH:mm:ss')}')`,
              error => {
                if (error) {
                  
                  reject(new UnauthorisedError('Not authorised.'));
                } else if (!token) {
                  const refreshToken = md5(
                    `${code +
                      salt +
                      moment.utc().format('YYYY-MM-DD HH:mm:ss')}`
                  );
                  db.query(
                    `insert into user_refresh_token(token, user_id) values('${refreshToken}', '${code}')`,
                    error => {
                      
                      if (error) {
                        reject(new UnauthorisedError('Not authorised.'));
                      } else {
                        resolve(
                          new OAuth2Response(code, accessToken, refreshToken)
                        );
                      }
                    }
                  );
                } else {
                  
                  resolve(new OAuth2Response(code, accessToken, token));
                }
              }
            );
          } else {
            
            reject(new UnauthorisedError('No account found.'));
          }
        }
      }
    );
  });
};

OAuth2Request.prototype.validateToken = function(token) {
  return new Promise((resolve, reject) => {
    db.query(
      `select * from user_access_token where token='${token}' and expired_on > '${moment
        .utc()
        .format('YYYY-MM-DD HH:mm:ss')}' order by id desc limit 1`,
      (error, results) => {
        
        if (error || results.length == 0) {
          reject(new UnauthorisedError('Unauthorised request.'));
        } else {
          resolve('Token validated.');
        }
      }
    );
  });
};

OAuth2Request.prototype.refreshToken = function(token) {
  return new Promise((resolve, reject) => {
    db.query(
      `select user_id as userId from user_refresh_token where token='${token}' and status=1 order by id desc limit 1`,
      (error, results) => {
        if (error) {
          
          reject(new UnauthorisedError('Unauthorised request.'));
        } else if (results.length > 0) {
          const userId = results[0].userId;
          db.query(
            `select id, code, salt from user where id='${userId}' and status=1`,
            (error, results) => {
              if (error || results.length == 0) {
                
                reject(new UnauthorisedError('Unauthorised request.'));
              } else {
                const { code } = results[0];
                const accessToken = jwt.sign(
                  {
                    data: {
                      id: userId,
                      code,
                      expiry: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                    },
                  },
                  tokenSecret
                );
                db.query(
                  `insert into user_access_token(token, user_id, expired_on) values('${accessToken}', ${userId}, '${moment
                    .utc()
                    .add(1, 'hour')
                    .format('YYYY-MM-DD HH:mm:ss')}')`,
                  error => {
                    
                    if (error) {
                      reject(new UnauthorisedError('Unauthorised request.'));
                    } else {
                      resolve(new OAuth2Response(code, accessToken, token));
                    }
                  }
                );
              }
            }
          );
        } else {
          
          reject(new UnauthorisedError('Refresh token expired.'));
        }
      }
    );
  });
};

module.exports = {
  OAuth2Request,
  OAuth2Response,
};
