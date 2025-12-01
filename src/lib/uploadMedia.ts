import { supabase } from "./supabse"

export const uploadStory = async (file: File) => {
  if (!file) return

  const filePath = `${Date.now()}_${file.name}`
  //bucket name is story_uploads
  const { error: uploadError } = await supabase.storage
    .from("story_uploads")
    .upload(filePath, file)

  if (uploadError) {
    console.error("Storage upload failed:", uploadError)
    return
  }

  //create signed url for the file and use it to upload file to the databsse and stored in bucket
  const { data: urlData, error: urlError } = await supabase.storage
    .from("story_uploads")
    .createSignedUrl(filePath, 60 * 60 * 24 * 30)
  console.log("urlData", urlData)
  let finalUrl: string | null = null
  if (urlError) {
    console.warn(
      "Creating signed URL failed, falling back to public URL:",
      urlError
    )
    const { publicURL } = supabase.storage
      .from("story_uploads")
      .getPublicUrl(filePath)
    finalUrl = publicURL ?? null
  } else {
    finalUrl = urlData?.signedURL ?? null
  }

  //insert the file path and url into the stories table
  const { data: insertData, error: insertError } = await supabase
    .from("stories")
    .insert({
      file_path: filePath,
      url: finalUrl,
    })

  if (insertError) {
    console.error("Inserting into stories failed:", insertError)
    return
  }

  console.log("Story saved!", insertData)
}
