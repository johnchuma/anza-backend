const { User,Business } = require("../../models");
const getUrl = require("../../utils/cloudinary_upload");

const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const { successResponse, errorResponse } = require("../../utils/responses");
const bcrypt = require('bcrypt')
const {Op} = require("sequelize");
const sendSMS = require("../../utils/send_sms");
const addPrefixToPhoneNumber = require("../../utils/add_number_prefix");
const { resetPassword, sendMail } = require("../../utils/mail_controller");
const business = require("../../models/business");


const sendMessage = async (req, res) => {
  try {
    const { to, type, subject, message } = req.body;

    let promises = []; // Array to hold promises

    switch (to) {
      case "all":
        const users = await User.findAll();
        users.forEach(async (user) => {
          switch (type) {
            case "all":
              promises.push(sendSMS(addPrefixToPhoneNumber(user.phone), message));
              promises.push(sendMail(user.email, subject, message));
              break;
            case "sms":
              promises.push(sendSMS(addPrefixToPhoneNumber(user.phone), message));
              break;
            case "mail":
              promises.push(sendMail(user.email, subject, message));
              break;
            default:
              break;
          }
        });
        break;
      
      default:
        const user = await User.findOne({
          where: {
            email: to,
          },
        });
        if(user){
          switch (type) {
            case "all":
              promises.push(sendSMS(addPrefixToPhoneNumber(user.phone), message));
              promises.push(sendMail(user.email, subject, message));
              break;
            case "sms":
              promises.push(sendSMS(addPrefixToPhoneNumber(user.phone), message));
              break;
            case "mail":
              promises.push(sendMail(user.email, subject, message));
              break;
            default:
              break;
          }
        }
        else{
           if(to.includes("@")){
            promises.push(sendMail(to, subject, message));

           }
           else{
            promises.push(sendSMS(addPrefixToPhoneNumber(to), message));
           }
        }
        break;
    }

    await Promise.all(promises);

    successResponse(res, true);
  } catch (error) {
    errorResponse(res, error);
  }
};

const sendPasswordLink = async (req,res)=>{
  try {
    const {email} = req.body
    const user = await User.findOne({
      where:{
        email
      }
    })
    if (!user) {
      res.status(404).json({
        status: false,
        message: "User does not exist"
      });
    }
    else{
      await resetPassword(user)
    }
    successResponse(res,true)
  } catch (error) {
    errorResponse(res,error)
  }
}
const passwordReset = async (req,res)=>{
  try {
    let {password} = req.body;
    const uuid = req.params.uuid
    const user = await User.findOne({
      where:{
        uuid
      }
    })
    const hashedPassword = bcrypt.hashSync(password, 10);
    password = hashedPassword;
    const response = user.update({
      password
    })
    successResponse(res,response)
  } catch (error) {
    errorResponse(res,error)
  }
}
const pushSMS = async(req,res)=>{
  try {
    const {message} = req.body;
    let numbers = []

    const response = await sendSMS(numbers,message)
    successResponse(res,response)
  } catch (error) {
    errorResponse(res,error)
  }
}
const registerUser = async (req, res) => {
    try {
      const {
        name,
        email,
        phone, 
        password
      } = req.body;
     let role = "customer"
      const user = await User.findOne({ where: { email } });
      if (user) {
        res.status(403).json({
          status: false,
          message: "Email is already registered"
        });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
          name,
          phone,
          email,
          password: hashedPassword,
          role
        });  
        const response = await User.findOne({
          where: {
            email: email
          }
        });
        // sendSMS(addPrefixToPhoneNumber(phone),`Thank you for joining Shule Alumni as ${name}. You can now interact with and meet other alumni in the system.`)
        res.status(201).json({
          status: true,
          body: response
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal server error",
        error: error
      });
      console.log(error);
    }
  };



const updateUser = async (req, res) => {
  try {
    const uuid = req.params.uuid; // Move this line to after getting user object
    let {
      password,
     
      ...otherFields // Use object destructuring to collect other fields
    } = req.body;
   
    if (password && password.length < 15) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      password = hashedPassword;
    } else {
      delete otherFields.password;
    }
    let image = null;
    if (req.file) {
      image = await getUrl(req);
    }

    const user = await User.findOne({
      where: {
        uuid
      }
    });

    const response = await user.update({
      password,
      image,
      ...otherFields 
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};



const deleteUser = async(req,res)=>{
    try {     
        const uuid = req.params.uuid
        const user = await User.findOne({
            where:{
                uuid
            }
        })
        const response =  await user.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({
          status: false,
          message: "User does not exist"
        });
      } else {
        if (await bcrypt.compare(password, user.password)) {
          const response = await User.findOne({
            where: {
              email: email
            },
            include:[Business]
          });
          
            res.status(200).json({
              status: true,
              response
            });
          
         
        } else {
          res.status(403).json({
            status: false,
            message: "Wrong password"
          });
        }
      }
    } catch (error) {
      internalError();
    }
  };

  const getAllUsers = async(req,res)=>{
    try {
        const response = await User.findAll({
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
  }

  const getAllSellers = async(req,res)=>{
    try {
        const response = await User.findAll({
          include:[Business],
          where:{
            role: "seller"
          }
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
  }

const getUserDetails = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const user = await User.findOne({
            where:{
                uuid
            },
        });
        successResponse(res,user)
    } catch (error) {
        errorResponse(res,error)
    }
}
 
//   const getAllUsers = async(req,res)=>{
//     try {
//       const response = await User.findAll({include:[School],where:{
//         role:{
//           [Op.ne]:"Alumni"
//         }
//       }})
//      successResponse(res,response)
//     } catch (error) {
//       errorResponse(res,error)
//     }
//   }
//   const allUsers = async(req,res)=>{
//     try {
//       const response = await User.findAll({include:[School]})
//      successResponse(res,response)
//     } catch (error) {
//       errorResponse(res,error)
//     }
//   }
//   const getAllAlumni = async(req,res)=>{
//     try {
//       const response = await User.findAll({include:[School],
//         where:{
//         role:{
//           [Op.eq]:"Alumni"
//         }
//       }})
//      successResponse(res,response)
//     } catch (error) {
//       errorResponse(res,error)
//     }
//   }
//   const getUserFullInformation = async (req,res)=>{
//     try {
//       const uuid = req.params.uuid;
//       const user = await User.findOne({
//         where:{
//           uuid
//         },
//         attributes:{
//           exclude:['schoolId']
//         },
//         include:[School,Gallery]
//       })
//       successResponse(res,user)
//     } catch (error) {
//       errorResponse(res,error)
//     }
//   }
//   const getSchoolAlumni = async(req,res)=>{
//     try {
//       const school_uuid = req.params.uuid;

//       const school = await School.findOne({
//         where:{
//           uuid:school_uuid
//         }
//       })
//       const response = await User.findAll({
//       where:{
//         [Op.and]:[
//           {
//             schoolId:school.id
//           },
//           {
//             role:"Alumni"
//           }
//         ]
//       }})
//      successResponse(res,response)
//     } catch (error) {
//       errorResponse(res,error)
//     }
//   }
//   const getHeadmasters = async(req,res)=>{
//     try {
     
//       const response = await User.findAll({
//       where:
//           {
//             role:"Moderator"
//       }})
//      successResponse(res,response)
//     } catch (error) {
//       errorResponse(res,error)
//     }
//   }

  const getHash = async(req,res)=>{
    try {
    const password =  bcrypt.hashSync("password",10)
    successResponse(res,password)
    } catch (error) {
      errorResponse(res,error)
    }
  }
  module.exports = {
    registerUser,
    loginUser,
    getHash,
    updateUser,
    deleteUser,
    sendMessage,
    sendPasswordLink,
    passwordReset,
    pushSMS,
    getUserDetails,
    getAllUsers,
    getAllSellers
  }