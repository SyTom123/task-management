const md5 = require('md5');
const User = require("../models/user.model");
const gererateHelper = require("../../../helpers/generate");
const sendMailHelper = require("../../../helpers/sendMail");
const forgotPassword = require("../../../api/v1/models/forgot-password.modle");
const ForgotPassword = require('../../../api/v1/models/forgot-password.modle');
//[POST] api/v1/users/register
module.exports.register = async(req, res) => {
    try {
        req.body.password = md5(req.body.password);
        const existEmail = await User.findOne({
            email: req.body.email,
            deleted: false
        });
        if(existEmail){
            res.json({
                code: 400,
                message: "Email đã tồn tại"
            });
        }
        else {
            const user = new User ({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password
            });
            user.save();
            const token = user.token;
            res.cookie("token", token)
            res.json({
                code: 200,
                message: "Tạo tài khoản thành công!",
                token: token
            })
        }
    }
    catch {
        res.json({
            code: 400,
            message: "Lỗi"
        });
    }
}
//[POST] api/v1/users/login
module.exports.login = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({
            email: email,
            deleted: false
        });

        if(!user) {
            res.json({
                code: 400,
                message: "Email không tồn tại!"
            });
            return;
        }
        if(md5(req.body.password) != user.password) {
            res.json({
                code: 400,
                message: "Sai mật khẩu"
            })
            return;
        }
        const token = user.token;
        res.cookie("token", token);

        res.json({
            code: 200,
            message: "Đăng nhập thành công!"
        });
    }
    catch {
        res.json({
            code: 400,
            message: "Lỗi"
        });
    }
}
// [POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
    const email = req.body.email;
    const user = User.find({
        email: email,
        deleted: false
    });

    if(!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại"
        })
    }
    const otp= gererateHelper.generateRandomNumber(8);
    const timeExpire = 5;
    const objectFogotPassword = {
        email: email,
        otp: otp,
        exprireAt: Date.now() + timeExpire* 60
    };

    const forgotPassword = new ForgotPassword(objectFogotPassword);
    await forgotPassword.save();

    //Gửi OTP qua email user
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `Mã OTP để lấy lại mật khẩu của bạn là <b>${otp}</b>. Sử dụng trong ${timeExpire} phút.
    Vui lòng không chia sẻ mã OTP này với bất kỳ ai`;

    sendMailHelper.sendMail(email, subject, html);
    res.json({
        code: 200,
        message: "Đã gửi mã OTP qua email"
    })
     
}

