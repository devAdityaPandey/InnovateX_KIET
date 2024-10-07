import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user"; // Ensure your User model is updated with image and dept fields
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/lib/mailer";

// Connect to the database
connectToDatabase();

// Define the request body type
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  image: string; // URL or base64 encoded image
  dept: string; // Department the user belongs to
}

// Define the response type for success
interface SuccessResponse {
  message: string;
  success: boolean;
  savedUser: Omit<Document, "password">; // Omitting password field from the user in the response
}

// Define the response type for error
interface ErrorResponse {
  error: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Parsing the request body
    const reqBody: RegisterRequestBody = await request.json();

    // Destructuring the request body
    const { name, email, password, image, dept } = reqBody;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user instance with additional fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image, // Add image URL or base64 encoded image
      dept, // Add department
      isAdmin: false,
      verifyToken: "", // Token for email verification
      verifyTokenExpiry: null, // Expiry for verification token
      forgetPasswordToken: "", // Token for password reset
      forgetPasswordTokenExpiry: null, // Expiry for password reset token
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
