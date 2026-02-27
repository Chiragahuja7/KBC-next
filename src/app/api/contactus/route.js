import connectDB from "@/src/lib/mongodb";
import Contact from "@/src/models/Contact";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    return Response.json(
      {
        success: true,
        data: newContact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
