import connectDB from "@/src/lib/mongodb";
import Admin from "@/src/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  try {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const data = {
      email: "Admin@gmail.com",
      password: hashedPassword,
    };

    await Admin.create(data);

    return new Response(
      JSON.stringify({ message: "Admin registered successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error processing request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
