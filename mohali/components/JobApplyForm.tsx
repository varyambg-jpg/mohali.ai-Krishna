const handleApplySubmit = async (jobId: string) => {
  try {
    const localApply = applyStates[jobId];

    // Validate required fields
    if (!localApply.name || !localApply.email || !localApply.phone) {
      alert("Please fill in all required fields: Name, Email, Phone");
      return;
    }

    if (!localApply.disclaimer) {
      alert("Please accept the disclaimer");
      return;
    }

    let cvUrl = "";

    // Upload CV if provided
    if (cvFiles[jobId]) {
      const fd = new FormData();
      fd.append("file", cvFiles[jobId]!);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert("CV upload failed");
        return;
      }
      cvUrl = uploadData.url;
    }

    // Submit application
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: localApply.name,
        email: localApply.email,
        phone: localApply.phone,
        cvUrl,
        jobId,
        disclaimer: true,
      }),
    });

    const result = await res.json();

    if (result.success) {
      alert(`Application submitted!\nPoster: ${result.posterContact.email}, ${result.posterContact.phone}`);

      // Reset form state
      setApplyStates(prev => ({
        ...prev,
        [jobId]: { name: "", email: "", phone: "", disclaimer: false },
      }));
      setCvFiles(prev => ({ ...prev, [jobId]: null }));
    } else {
      alert(result.error || "Failed to submit application");
    }
  } catch (err) {
    console.error("handleApplySubmit error:", err);
    alert("An unexpected error occurred while submitting your application");
  }
};
