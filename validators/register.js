import Validator from 'validator';
import isEmpty from 'is-empty';

export const validateRegisterInputs = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordRe = !isEmpty(data.passwordRe) ? data.passwordRe : '';
  data.gender = !isEmpty(data.gender) ? data.gender : ''; // may not be necessary

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.passwordRe)) {
    errors.passwordRe = 'Confirm password field is required';
  }

  if (!Validator.equals(data.password, data.passwordRe)) {
    errors.passwordRe = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// // GET /register
// router.get('/', checkNotLogin, (req, res, next) => {
//   res.render('register');
// });

// router.post('/', checkNotLogin, function(req, res, next) {
//   const name = req.fields.name;
//   const gender = req.fields.gender;
//   const bio = req.fields.bio;
//   const avatar = req.files.avatar.path.split(path.sep).pop();
//   let password = req.fields.password;
//   const repassword = req.fields.repassword;

//   // 校验参数
//   try {
//     if (!(name.length >= 1 && name.length <= 10)) {
//       throw new Error('名字请限制在 1-10 个字符');
//     }
//     if (['m', 'f', 'o'].indexOf(gender) === -1) {
//       throw new Error('性别只能是 m、f 或 o');
//     }
//     if (!(bio.length >= 1 && bio.length <= 30)) {
//       throw new Error('个人简介请限制在 1-30 个字符');
//     }
//     if (!req.files.avatar.name) {
//       throw new Error('缺少头像');
//     }
//     if (password.length < 6) {
//       throw new Error('密码至少 6 个字符');
//     }
//     if (password !== repassword) {
//       throw new Error('两次输入密码不一致');
//     }
//   } catch (e) {
//     // 注册失败，异步删除上传的头像
//     fs.unlink(req.files.avatar.path);
//     req.flash('error', e.message);
//     return res.redirect('/signup');
//   }

//   // 明文密码加密
//   password = sha1(password);

//   // 待写入数据库的用户信息
//   let user = {
//     name: name,
//     password: password,
//     gender: gender,
//     bio: bio,
//     avatar: avatar
//   };
//   // 用户信息写入数据库
//   UserModel.create(user)
//     .then(function(result) {
//       // 此 user 是插入 mongodb 后的值，包含 _id
//       user = result.ops[0];
//       // 删除密码这种敏感信息，将用户信息存入 session
//       delete user.password;
//       req.session.user = user;
//       // 写入 flash
//       req.flash('success', '注册成功');
//       // 跳转到首页
//       res.redirect('/posts');
//     })
//     .catch(function(e) {
//       // 注册失败，异步删除上传的头像
//       fs.unlink(req.files.avatar.path);
//       // 用户名被占用则跳回注册页，而不是错误页
//       if (e.message.match('duplicate key')) {
//         req.flash('error', '用户名已被占用');
//         return res.redirect('/signup');
//       }
//       next(e);
//     });
// });

// module.exports = router;
