"use server";

import { UTApi } from "uploadthing/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function uploadFiles(formData: FormData) {
  const files = formData.getAll("product_image") as File[];

  // Validate file sizes
  for (let file of files) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File ${file.name} is too large. Maximum file size is 5MB.`);
    }
  }

  // Upload files using UTApi
  const response = await new UTApi().uploadFiles(files);

  // Ensure response is in the expected format
  if (!Array.isArray(response)) {
    throw new Error('Unexpected response format from uploadFiles.');
  }

  return response;
}
