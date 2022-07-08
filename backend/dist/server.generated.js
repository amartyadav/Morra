/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./controllers/auth.controller.js":
/*!****************************************!*\
  !*** ./controllers/auth.controller.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./models/user.model.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n\nconst signin = async (req, res) => {\n  console.log(req.user);\n\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n      email: req.body.email\n    });\n\n    if (!user) {\n      return res.status(401).json({\n        message: 'User not found'\n      });\n    }\n\n    if (!user.authenticate(req.body.password)) {\n      return res.status(401).json({\n        message: 'Email and password do not match'\n      });\n    }\n\n    let token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n      _id: user._id\n    }, process.env.JWT_SECRET);\n    res.cookie('t', token, {\n      expire: new Date() + 9999\n    });\n    return res.json({\n      token,\n      user: {\n        _id: user._id,\n        name: user.name,\n        email: user.email\n      }\n    });\n  } catch (err) {\n    return res.status(401).json({\n      message: 'Could not sign in. Please try again'\n    });\n  }\n};\n\nconst signout = (req, res) => {\n  res.clearCookie('t');\n  return res.json({\n    message: 'Signout successful'\n  });\n};\n\nconst requireSignin = express_jwt__WEBPACK_IMPORTED_MODULE_2___default()({\n  secret: process.env.JWT_SECRET,\n  userProperty: 'auth',\n  algorithms: ['HS256']\n});\n\nconst hasAuthorization = (req, res, next) => {\n  const authorised = req.profile && req.auth && req.profile._id == req.auth._id;\n\n  if (!authorised) {\n    return res.status(403).json({\n      message: 'User is not authorized'\n    });\n  }\n\n  next();\n}; // const hasHistoryViewAuthorization = (req, res, next) => {\n//     const authorised = = req.profile && req.auth && req.profile.userId == req.auth.user_id\n// }\n// const userType = (req, res, next) => {\n//     console.log(req.user)\n//     if(req.profile.type != 'admin'){\n//         return res.status(403).json({\n//             message: 'User is not authorized'\n//         })\n//     }\n//     next()\n// }\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  signin,\n  signout,\n  requireSignin,\n  hasAuthorization //userType\n\n});\n\n//# sourceURL=webpack://backend/./controllers/auth.controller.js?");

/***/ }),

/***/ "./controllers/game.controller.js":
/*!****************************************!*\
  !*** ./controllers/game.controller.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_games_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/games.model */ \"./models/games.model.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./helpers/dbErrorHandler.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst play = async (req, res) => {\n  try {\n    let guess = Math.floor(Math.random() * 20) + 1;\n    let fingers = Math.floor(Math.random() * 10) + 1;\n    return res.status(200).json({\n      guess: guess,\n      fingers: fingers\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: 'Could not play the chance. Try again.'\n    });\n  }\n};\n\nconst save = async (req, res) => {\n  const game = new _models_games_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body);\n\n  try {\n    await game.save();\n    return res.status(200).json({\n      message: 'Game saved successfully'\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1___default().getErrorMessage(err)\n    });\n  }\n};\n\nconst userGameHistory = async (req, res) => {\n  try {\n    const user_id = req.params.user_id; //const userId = req.body.id;\n\n    const games = await _models_games_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      userId: user_id\n    });\n    return res.status(200).json(games);\n  } catch (err) {\n    return res.status(400).json({\n      error: err\n    });\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  play,\n  save,\n  userGameHistory\n});\n\n//# sourceURL=webpack://backend/./controllers/game.controller.js?");

/***/ }),

/***/ "./controllers/user.controller.js":
/*!****************************************!*\
  !*** ./controllers/user.controller.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./models/user.model.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./helpers/dbErrorHandler.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__);\n // var User = require('../models/user.model');\n\n // var _ = require('lodash');\n\n // var dbErrorHandler = require('../helpers/dbErrorHandler');\n\nconst create = async (req, res) => {\n  const user = new _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body);\n\n  try {\n    await user.save();\n    return res.status(200).json({\n      message: 'Successfully signed up'\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2___default().getErrorMessage(err)\n    });\n  }\n};\n\nconst list = async (req, res) => {\n  try {\n    const users = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().select('name email updated created');\n    res.json(users);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2___default().getErrorMessage(err)\n    });\n  }\n};\n\nconst userByID = async (req, res, next, id) => {\n  try {\n    const user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id);\n    if (!user) return res.status(400).json({\n      error: 'User not found'\n    });\n    req.profile = user;\n    next();\n  } catch (err) {\n    return res.status(400).json({\n      error: \"error in finding user\"\n    });\n  }\n};\n\nconst read = async (req, res) => {\n  req.profile.hashed_password = undefined; // remove password from response\n\n  req.profile.salt = undefined; // remove salt from response\n\n  return res.json(req.profile); // return user profile\n};\n\nconst update = async (req, res) => {\n  try {\n    let user = req.profile;\n    user = extend(user, req.body); // extend user object with new data\n\n    user.updated = Date.now();\n    await user.save();\n    user.hashed_password = undefined; // remove password from response\n\n    user.salt = undefined; // remove salt from response\n\n    res.json(user);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2___default().getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res) => {\n  try {\n    let user = req.profile;\n    let deletedUser = await user.remove();\n    deletedUser.hashed_password = undefined; // remove password from response\n\n    deletedUser.salt = undefined; // remove salt from response\n\n    res.json(deletedUser);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2___default().getErrorMessage(err)\n    });\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  list,\n  userByID,\n  read,\n  update,\n  remove\n}); // module.exports = {\n//     create,\n//     list,\n//     userByID,\n//     read,\n//     update,\n//     remove\n// }\n\n//# sourceURL=webpack://backend/./controllers/user.controller.js?");

/***/ }),

/***/ "./express.js":
/*!********************!*\
  !*** ./express.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _routes_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/index */ \"./routes/index.js\");\n/* harmony import */ var _routes_index__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_routes_index__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _routes_users__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/users */ \"./routes/users.js\");\n/* harmony import */ var _routes_auth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/auth */ \"./routes/auth.js\");\n/* harmony import */ var _routes_game__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./routes/game */ \"./routes/game.js\");\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\nvar logger = __webpack_require__(/*! morgan */ \"morgan\"); // importing routes\n\n\n\n\n\n // parse body params and attache them to req.body app.use(bodyParser.json()) app.use(bodyParser.urlencoded({ extended: true })) app.use(cookieParser())\n\napp.use(compression__WEBPACK_IMPORTED_MODULE_4___default()()); // secure apps by setting various HTTP headers\n\napp.use(helmet__WEBPACK_IMPORTED_MODULE_6___default()()); // enable CORS - Cross Origin Resource Sharing app.use(cors())\n\napp.use(cors__WEBPACK_IMPORTED_MODULE_5___default()());\napp.use(logger('dev'));\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().urlencoded({\n  extended: false\n}));\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, 'public')));\napp.use('/', (_routes_index__WEBPACK_IMPORTED_MODULE_7___default()));\napp.use('/', _routes_users__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\napp.use('/', _routes_auth__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\napp.use('/', _routes_game__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\napp.use((err, req, res, next) => {\n  if (err.name === 'UnauthorizedError') {\n    res.status(401).json({\n      \"error\": err.name + \": \" + err.message\n    });\n  } else if (err) {\n    res.status(400).json({\n      \"error\": err.name + \": \" + err.message\n    });\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://backend/./express.js?");

/***/ }),

/***/ "./helpers/dbErrorHandler.js":
/*!***********************************!*\
  !*** ./helpers/dbErrorHandler.js ***!
  \***********************************/
/***/ ((module) => {

"use strict";
eval("\n\nconst getUniqueErrorMessage = err => {\n  let output;\n\n  try {\n    let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));\n    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';\n  } catch (ex) {\n    output = 'Unique field already exists';\n  }\n\n  return output;\n};\n\nconst getErrorMessage = err => {\n  let message = '';\n\n  if (err.code) {\n    switch (err.code) {\n      case 11000:\n      case 11001:\n        message = getUniqueErrorMessage(err);\n        break;\n\n      default:\n        message = 'Something went wrong';\n    }\n  } else {\n    for (let errName in err.errors) {\n      if (err.errors[errName].message) message = err.errors[errName].message;\n    }\n  }\n\n  return message;\n};\n\nmodule.exports = {\n  getErrorMessage\n};\n\n//# sourceURL=webpack://backend/./helpers/dbErrorHandler.js?");

/***/ }),

/***/ "./models/games.model.js":
/*!*******************************!*\
  !*** ./models/games.model.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst gameSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  userId: {\n    type: String,\n    required: \"userId is required\",\n    trim: true\n  },\n  userName: {\n    type: String,\n    required: \"userName is required\",\n    trim: true\n  },\n  botScore: {\n    type: Number,\n    default: 0\n  },\n  yourScore: {\n    type: Number,\n    default: 0\n  },\n  date: {\n    type: Date,\n    default: Date.now\n  }\n}, {\n  collection: \"games\"\n});\nconst gameModel = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Game\", gameSchema);\ngameModel.createIndexes();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameModel);\n\n//# sourceURL=webpack://backend/./models/games.model.js?");

/***/ }),

/***/ "./models/user.model.js":
/*!******************************!*\
  !*** ./models/user.model.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n //const mongoose = require(\"mongoose\");\n\n //const crypto = require(\"crypto\");\n\nconst userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  email: {\n    type: String,\n    unique: true,\n    required: \"Email is required\",\n    trim: true,\n    index: true,\n    match: [/.+\\@.+\\..+/, 'Please fill a valid email address']\n  },\n  name: {\n    type: String,\n    required: \"Name is required\",\n    trim: true\n  },\n  hashed_password: {\n    type: String,\n    required: \"Password is required\"\n  },\n  salt: String,\n  updated: {\n    type: Date,\n    default: Date.now\n  },\n  userType: {\n    type: String,\n    enum: [\"admin\", \"user\"],\n    default: \"user\"\n  }\n}, {\n  collection: \"users\"\n});\nuserSchema.virtual(\"password\").set(function (password) {\n  this._password = password;\n  this.salt = this.makeSalt();\n  this.hashed_password = this.encryptPassword(password);\n}).get(function () {\n  return this._password;\n});\nuserSchema.methods = {\n  authenticate: function (plainText) {\n    return this.encryptPassword(plainText) === this.hashed_password;\n  },\n  encryptPassword: function (password) {\n    if (!password) return \"\";\n\n    try {\n      return crypto__WEBPACK_IMPORTED_MODULE_1___default().createHmac(\"sha256\", this.salt).update(password).digest(\"hex\");\n    } catch (err) {\n      return \"\";\n    }\n  },\n  makeSalt: function () {\n    return Math.round(new Date().valueOf() * Math.random()) + '';\n  }\n};\nuserSchema.path(\"hashed_password\").validate(function (v) {\n  if (this._password && this._password.length < 6) {\n    this.invalidate(\"password\", \"Password must be at least 6 characters.\");\n  }\n\n  if (this.isNew && !this._password) {\n    this.invalidate(\"password\", \"Password is required.\");\n  }\n}, null);\nconst userModel = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", userSchema);\nuserModel.createIndexes();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userModel); //module.exports = userModel;\n\n//# sourceURL=webpack://backend/./models/user.model.js?");

/***/ }),

/***/ "./routes/auth.js":
/*!************************!*\
  !*** ./routes/auth.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./controllers/auth.controller.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/auth/signin').post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signin);\nrouter.route('/auth/signout').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signout);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://backend/./routes/auth.js?");

/***/ }),

/***/ "./routes/game.js":
/*!************************!*\
  !*** ./routes/game.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_game_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/game.controller */ \"./controllers/game.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./controllers/auth.controller.js\");\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/user.controller */ \"./controllers/user.controller.js\");\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/api/game').get(_controllers_game_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].play);\nrouter.route('/api/game/save/:user_id').post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_game_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].save);\nrouter.route('/api/game/history/:user_id').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_game_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userGameHistory);\nrouter.param('user_id', _controllers_user_controller__WEBPACK_IMPORTED_MODULE_3__[\"default\"].userByID);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://backend/./routes/game.js?");

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar __dirname = process.cwd();\n/* GET home page. */\n\n\nrouter.get('/', function (req, res, next) {\n  //res.render('index', { title: 'Express' });\n  res.sendFile('/public/index.html', {\n    root: __dirname\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://backend/./routes/index.js?");

/***/ }),

/***/ "./routes/users.js":
/*!*************************!*\
  !*** ./routes/users.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/user.controller */ \"./controllers/user.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./controllers/auth.controller.js\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/api/users').get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list).post(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create);\nrouter.route('/api/users/:user_id').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove);\nrouter.param('user_id', _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userByID);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router); //module.exports = router;\n\n//# sourceURL=webpack://backend/./routes/users.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./express */ \"./express.js\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n\n //var http = require('http');\n\n\n\nvar debug = __webpack_require__(/*! debug */ \"debug\")('backend:server');\n/**\n * Mongoose dependency\n */\n// import mongoose from 'mongoose';\n\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nmongoose.Promise = global.Promise;\nmongoose.connect(process.env.MONGODB_URI, {\n  dbName: 'justice_for_ugly_animals'\n});\nmongoose.connection.on('connected', () => {\n  console.info('MongoDB connected');\n});\nmongoose.connection.on('error', err => {\n  console.error(`MongoDB connection error: ${err}`);\n  process.exit(-1);\n});\n/**\n * Get port from environment and store in Express.\n */\n\nvar port = normalizePort(process.env.PORT || '3001');\n_express__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set('port', port);\n/**\n * Create HTTP server.\n */\n\nvar server = http__WEBPACK_IMPORTED_MODULE_1___default().createServer(_express__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n/**\n * Listen on provided port, on all network interfaces.\n */\n\nserver.listen(port);\nserver.on('error', onError);\nserver.on('listening', onListening);\n/**\n * Normalize a port into a number, string, or false.\n */\n\nfunction normalizePort(val) {\n  var port = parseInt(val, 10);\n\n  if (isNaN(port)) {\n    // named pipe\n    return val;\n  }\n\n  if (port >= 0) {\n    // port number\n    return port;\n  }\n\n  return false;\n}\n/**\n * Event listener for HTTP server \"error\" event.\n */\n\n\nfunction onError(error) {\n  if (error.syscall !== 'listen') {\n    throw error;\n  }\n\n  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages\n\n  switch (error.code) {\n    case 'EACCES':\n      console.error(bind + ' requires elevated privileges');\n      process.exit(1);\n      break;\n\n    case 'EADDRINUSE':\n      console.error(bind + ' is already in use');\n      process.exit(1);\n      break;\n\n    default:\n      throw error;\n  }\n}\n/**\n * Event listener for HTTP server \"listening\" event.\n */\n\n\nfunction onListening() {\n  var addr = server.address();\n  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;\n  debug('Listening on ' + bind);\n}\n\n//# sourceURL=webpack://backend/./server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("debug");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-jwt");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;