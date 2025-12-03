import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
`;

export const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const Bio = styled.p`
  color: #555;
`;

export const AlbumList = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

export const AlbumCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const AlbumHeader = styled.div<{ clickable: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  padding: 0.5rem;
  background-color: #f9f9f9;
`;

export const Cover = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 1rem;
`;

export const AlbumInfo = styled.div`
  flex: 1;

  p {
    font-size: 0.8rem;
    color: #888;
    margin: 0.2rem 0 0;
  }
`;

export const ToggleIcon = styled.span`
  font-size: 1.2rem;
`;

export const TrackList = styled.div`
  padding: 0.5rem 1rem;
  background-color: #fff;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  animation: ${slideDown} 0.3s ease-out;
`;
export const TrackItem = styled.p`
  margin: 0.3rem 0;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #f5f5f5;
  }
`;
