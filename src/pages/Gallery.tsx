import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../components/LoadingContext";
import Spinner from "../components/Spinner";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import { CloseButton } from "../components/CloseButton";
import { deleteImage, fetchImages } from "../api/api";
import Modal from "react-modal";
import {
  Container,
  DateText,
  DeleteButton,
  Grid,
  ImageCard,
  ModalContent,
  ModalImage,
  TiTle,
  TitleWrapper,
  UploadButton,
} from "./Gallery.styles";

type ImageItem = {
  _id: string;
  imageUrl: string;
  title: string;
  createdAt?: string;
};

export const Gallery = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState<ImageItem | undefined>(
    undefined
  );
  const [images, setImages] = useState<ImageItem[]>([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const data = await fetchImages();
        setImages(data);
      } catch (err) {
        console.error("이미지 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadClick = () => {
    navigate("/upload");
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const success = await deleteImage(id);
      if (success) {
        setImages((prev) => prev.filter((img) => img._id !== id));
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.error("삭제 중 오류:", err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading && <Spinner />}
      <TitleWrapper>
        <TiTle>한로로 갤러리</TiTle>
        <UploadButton onClick={handleUploadClick}> + </UploadButton>
      </TitleWrapper>
      <Grid>
        {images.map((img) => (
          <ImageCard key={img._id}>
            <img
              src={img.imageUrl}
              alt={img.title}
              onClick={() => setSelectedImg(img)} // ✅ 객체 전체 저장
            />
            <DeleteButton onClick={() => handleDelete(img._id)}>
              🗑️
            </DeleteButton>
            <p>{img.title}</p>
            {img.createdAt && (
              <DateText>{formatRelativeTime(img.createdAt)}</DateText>
            )}
          </ImageCard>
        ))}
      </Grid>
      {selectedImg && (
        <Modal
          isOpen={!!selectedImg}
          onRequestClose={() => setSelectedImg(undefined)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            content: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              border: "none",
              background: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
            },
          }}
        >
          <ModalContent>
            <ModalImage src={selectedImg.imageUrl} alt={selectedImg.title} />
            <CloseButton onClick={() => setSelectedImg(undefined)} />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};
