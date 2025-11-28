import { supabase } from "./supabse"

export async function uploadMedia(
  file: File,
  user_id: string,
  stroy_id: number
) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${fileExt}`
  const filePath = `stories/${user_id}/${fileName}`

  //upload to supabase storage
  const { error: uploadError } = await supabase.storage
    .from("story_uploads")
    .upload(filePath, file)

  if (uploadError) {
    console.error("Upload error:", uploadError)
    return null
  }

  //get public url
  const { data: urlData } = supabase.storage
    .from("story_uploads")
    .getPublicUrl(filePath)

  const file_url = urlData?.publicURL
  const file_type = file.type.startsWith("video") ? "video" : "image"

  //save record in uploaded_data table
  const { data: dbData, error: dbError } = await supabase
    .from("uploaded_data")
    .insert({
      user_id: user_id,
      file_url: file_url,
      file_type: file_type,
      stroy_id: stroy_id,
      created_at: new Date().toISOString(),
    })
    .select()

  if (dbError) {
    console.error("DB insert failed:", dbError)
    return null
  }

  return dbData[0]
}
