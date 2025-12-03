import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../components/LoadingContext";
import { uploadImage } from "../api/api";
import {
  Form,
  PageWrapper,
  PreviewImage,
  Title,
  UploadBox,
} from "./Upload.styles";
import Spinner from "../components/Spinner";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return alert("제목과 이미지를 모두 입력해주세요.");
    console.log(title);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    console.log(formData);
    setLoading(true);
    try {
      const data = await uploadImage(formData);
      console.log("업로드 완료:", data);
      navigate("/gallery");
      setLoading(false);
    } catch (err) {
      console.error("업로드 중 오류 발생:", err);
      alert("업로드에 실패했습니다. 콘솔을 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  return (
    <PageWrapper>
      <UploadBox>
        <Title>📤 이미지 업로드</Title>
        <Form onSubmit={handleSubmit}>
          <label>제목</label>
          <input
            type="text"
            placeholder="이미지 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>이미지 선택</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && <PreviewImage src={previewUrl} alt="미리보기" />}
          <button type="submit">업로드</button>
        </Form>
      </UploadBox>
    </PageWrapper>
  );
};

export default Upload;
