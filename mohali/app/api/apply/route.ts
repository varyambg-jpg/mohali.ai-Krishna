import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.jobId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mohali_jobs");

    // Save application in MongoDB
    const result = await db.collection("applications").insertOne({
      ...data,
      createdAt: new Date(),
    });

    // Fetch job poster contact info
    const job = await db
      .collection("jobs")
      .findOne({ _id: new ObjectId(data.jobId) });

    const posterContact = job
      ? { email: job.contactEmail, phone: job.contactPhone }
      : { email: "N/A", phone: "N/A" };

    // Send email to admin
    if (process.env.ADMIN_EMAIL) {
      await sendMail(
        process.env.ADMIN_EMAIL,
        `New Job Application for ${job?.title || "Unknown Job"}`,
        `
          <h2>New Job Application</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Job:</strong> ${job?.title || "N/A"}</p>
          <p><strong>Job ID:</strong> ${data.jobId}</p>
        `
      );
    }

    return NextResponse.json({
      success: true,
      applicationId: result.insertedId,
      posterContact,
    });
  } catch (err) {
    console.error("POST /api/apply error:", err);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
