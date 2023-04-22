const otpGenerator = require("otp-generator");
const SendOtp = require("sendotp");

let otp = otpGenerator.generate(6, {
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
});
console.log(otp);

const sendOtp = new SendOtp("394677Tc6bccBYfhCn6438c7c8P1");

/* sendOtp.verify("9439744847", otp, function (error, data) {
  console.log(data); // data object with keys 'message' and 'type'
  if (data.type == "success") console.log("OTP verified successfully");
  if (data.type == "error") console.log("OTP verification failed");
}); */
sendOtp.send(9861216682, 9861216682, otp, () => {
  console.log("OTP Sent Successfully");
});
