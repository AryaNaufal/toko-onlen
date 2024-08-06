"use client";
import { useState } from "react";
import { uploadFiles } from "./imageUploader";

export default function MyForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await uploadFiles(formData);
      console.log("Upload successful:", response.map((file) => file.data?.key));
    } catch (err: any) {
      setError(err.message || "An error occurred during the file upload.");
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="product_image" type="file" multiple />
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

