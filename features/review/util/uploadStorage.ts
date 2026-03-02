'use server';
import { createClient } from '@/lib/supabase/server';

export const uploadProofImage = async (file: File) => {
  const supabase = await createClient();

  // 1. 중복 방지를 위한 고유 파일 이름 생성
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `private/${fileName}`;

  // 2. 스토리지에 업로드
  const { error } = await supabase.storage
    .from('proof_images') // 버킷 이름
    .upload(filePath, file);

  if (error) throw error;

  // 3. 업로드된 파일의 Public URL 가져오기
  const {
    data: { publicUrl },
  } = supabase.storage.from('proof_images').getPublicUrl(filePath);

  return publicUrl; // 이 string을 스토어에 저장
};
