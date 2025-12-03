import { useState } from "react";
import { artistData } from "../data/artistData";
import {
  AlbumCard,
  AlbumHeader,
  AlbumInfo,
  AlbumList,
  Bio,
  Cover,
  ProfileImage,
  ProfileSection,
  ToggleIcon,
  TrackItem,
  TrackList,
  Wrapper,
} from "./ArtistProfile.styles";

export const ArtistProfile = () => {
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);

  const toggleAlbum = (id: string, hasTracks: boolean) => {
    if (!hasTracks) return;
    setOpenAlbumId(openAlbumId === id ? null : id);
  };

  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImage src={artistData.imageUrl} alt={artistData.name} />
        <h2>{artistData.name}</h2>
        <h4>{artistData.differentName}</h4>
        <p>
          소속사 : {artistData.company} <br />
          데뷔일 : {artistData.debutDate}
        </p>
        <p>{artistData.genre}</p>
        <Bio>{artistData.bio}</Bio>
      </ProfileSection>

      <h3>🎵 앨범</h3>
      <AlbumList>
        {artistData.albums.map((album) => {
          const hasTracks = album.tracks && album.tracks.length > 0;
          const isOpen = openAlbumId === album.id;

          return (
            <AlbumCard key={album.id}>
              <AlbumHeader
                onClick={() => toggleAlbum(album.id, hasTracks)}
                clickable={hasTracks}
              >
                <Cover src={album.coverUrl} alt={album.title} />
                <AlbumInfo>
                  <strong>{album.title}</strong>
                  <p>{new Date(album.releaseDate).toLocaleDateString()}</p>
                </AlbumInfo>
                {hasTracks && <ToggleIcon>{isOpen ? "▲" : "▼"}</ToggleIcon>}
              </AlbumHeader>

              {isOpen && hasTracks && (
                <TrackList>
                  {album.tracks.map((track, idx) => (
                    <TrackItem key={idx}>
                      {idx + 1}. {track.title} ({track.duration})
                    </TrackItem>
                  ))}
                </TrackList>
              )}
            </AlbumCard>
          );
        })}
      </AlbumList>
    </Wrapper>
  );
};
