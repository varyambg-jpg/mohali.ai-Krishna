import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { sendMail } from "@/lib/mailer";

// Fetch all jobs
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mohali_jobs");
    const jobs = await db.collection("jobs").find({}).toArray();
    return NextResponse.json(jobs);
  } catch (err) {
    console.error("GET /api/jobs error:", err);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// Add new job
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // validation
    if (!data.title || !data.company || !data.contactEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mohali_jobs");
    const result = await db.collection("jobs").insertOne(data);

    // Send mail to admin (safe wrap in try)
    if (process.env.ADMIN_EMAIL) {
      try {
        await sendMail(
          process.env.ADMIN_EMAIL,
          "New Job Posted",
          `
          <h2>New Job Posted</h2>
          <p><strong>Title:</strong> ${data.title}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Email:</strong> ${data.contactEmail}</p>
          <p><strong>Phone:</strong> ${data.contactPhone}</p>
        `
        );
      } catch (mailErr) {
        console.error("Mailer failed:", mailErr);
      }
    }

    return NextResponse.json({ success: true, jobId: result.insertedId });
  } catch (err) {
    console.error("POST /api/jobs error:", err);
    return NextResponse.json({ error: "Failed to add job" }, { status: 500 });
  }
}

// Update job
export async function PUT(req: NextRequest) {
  try {
    const { id, ...updateData } = await req.json();
    if (!id) return NextResponse.json({ error: "Job ID missing" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("mohali_jobs");

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/jobs error:", err);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

// Delete job
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const admin_pass = searchParams.get("admin_pass");

    if (admin_pass !== "Admin@mohali") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!id) {
      return NextResponse.json({ error: "Job ID missing" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("mohali_jobs");
    await db.collection("jobs").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/jobs error:", err);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
