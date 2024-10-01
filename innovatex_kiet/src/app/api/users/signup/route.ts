// import { connect } from "@/db/db";
// import User from "@/models/userModel"
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/utils/mailer";

// connect();

// export async function POST(request : NextRequest){
//     try {
//         //request.json() contains the requestBody

//         const reqBody =request.json();

//         //destructuring the reqBody
//         const {userName ,email, password} = reqBody;

//         const user = await User.find({email});

//         if(user)
//         {
//             return NextResponse.json({error: "User already exists"},{status: 400});
//         }

//         const salt = await bcryptjs.genSalt(10);

//         const hashedPassword = await bcryptjs.hash(password, salt);

//         const newUser = new User({
//             userName,
//             email,
//             password: hashedPassword,
//             isAdmin: false,
//             verifyToken: "",
//             verifyTokenExpiry: null,
//             forgetPasswordToken: "",
//             forgetPasswordTokenExpiry: null,
//         });


//         const savedUser = await newUser.save()

//         console.log(savedUser);

//         //send varification mail

//         await sendEmail({email, emailType : "VERIFY", userId: savedUser._id})

//         return NextResponse.json({
//             message: "User registered successfully",
//             success: true,
//             savedUser
//         })


//     } catch (error:any) {
//         return NextResponse.json({error: error.messaage},{status: 500});
//     }
// }



import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

// Connect to the database
connect();

// Define the request body type
interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

// Define the response type for success
interface SuccessResponse {
  message: string;
  success: boolean;
  savedUser: Omit<Document, 'password'>; // Omitting password field from the user in the response
}

// Define the response type for error
interface ErrorResponse {
  error: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Parsing the request body
    const reqBody: RegisterRequestBody = await request.json();

    // Destructuring the request body
    const { username, email, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      verifyToken: "",
      verifyTokenExpiry: null,
      forgetPasswordToken: "",
      forgetPasswordTokenExpiry: null,
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    // Respond with success
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser: userWithoutPassword,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
