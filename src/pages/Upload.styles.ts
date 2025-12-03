import styled from "styled-components";

export const PageWrapper = styled.div`
  background: linear-gradient(to right, #6a4c93, #8b5fbf);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UploadBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #6a4c93;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-weight: bold;
    color: #444;
  }

  input[type="text"] {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  input[type="file"] {
    font-size: 0.95rem;
  }

  button {
    padding: 0.7rem;
    background-color: #6a4c93;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;
