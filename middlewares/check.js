// export const checkLogin = (req, res, next) => {
//     if (!req.session.user) {
//         req.flash('error', 'Not logged in');
//         return res.redirect('/signin');
//     }
//     next();
// };

// export const checkNotLogin = (req, res, next) => {
//     if (req.session.user) {
//         req.flash('error', 'Logged in');
//         return res.redirect('back');
//     }
//     next();
// };
