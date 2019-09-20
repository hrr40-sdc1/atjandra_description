import React from 'react';
import styled from 'styled-components';
import Share from './icons/Share.jsx';
import Heart from './icons/Heart.jsx';
import $ from 'jquery';


const BannerContainer = styled.div`
  position: relative;
  border-bottom: 1px solid #ccc;
`;

const PhotosContainer = styled.div`
  position: relative;
  min-height: 290px;
`;

const PrimaryPhotoContainer = styled.div`
  position: relative;
  float: left;
  width: 49.5%;
  height: 290px;
  border: 1px solid #222;
  overflow: hidden;
`;

const SecondaryPhotoContainer = styled.div`
  position: relative;
  float: left;
  width: 25%;
  height: 144px;
  border: 1px solid #222;
  overflow: hidden;
`;

const PrimaryPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;

const SecondaryPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;

const PhotoShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #07070755;
`;

const CommandsContainer = styled.div`
  position:absolute;
  top: 13px;
  right: 10px;
  height: 92%;
  z-index: 2;
`;

const SocialItem = styled.div`
  margin: 10px;
  padding: 10px 12px;
  display: inline-block;
  width: 70px;
  font-weight: 600;
  line-height: 16px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
`;

const Icon = styled.svg`
  margin-right: 10px;
  float: left;
  height: 15px;
  width: 15px;
  overflow: visible;
`;

const CommandItem = styled.div`
  margin: 10px;
  padding: 10px 12px;
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  font-weight: 600;
  line-height: 16px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
`;



const Banner = (props) => {

  let photos = [];

  // Sort photos
  if (props.photos) {
    photos = props.photos.sort(function(p1, p2) {
      return p1.photo_id - p2.photo_id;
    });
  }

  // Amazon S3 is by default. Set to local if in Env settings
  let s3 = process.env.S3_HOST || 'https://dy6au145h7uxl.cloudfront.net';

  let photo1 = 'default.jpg';
  let photo2 = 'default2.jpg';
  let photo3 = 'default3.jpg';
  let photo4 = 'default4.jpg';
  let photo5 = 'default5.jpg';

  const loadPhotos = () => {
    if (!photos.length) {
      return;
    }
    if (photos[0]) {
      photo1 = photos[0].file_path;
    }
    if (photos[1]) {
      photo2 = photos[1].file_path;
    }
    if (photos[2]) {
      photo3 = photos[2].file_path;
    }
    if (photos[3]) {
      photo4 = photos[3].file_path;
    }
    if (photos[4]) {
      photo5 = photos[4].file_path;
    }
  };

  const zoomPhoto = (event) => {
    let $photo = $(event.target);

    // Shadow all other photos
    $('.photo-shadow').each((index, shadow) => {
      if ($photo.data('id') !== $(shadow).data('id')) {
        $(shadow).css({ width: '100%'});
      }
    });

    let style = {
      width: '105%',
      height: '105%'
    };

    if ($photo.width() > $photo.height()) {
      style.marginLeft = '-2.5%';
    }

    $photo.animate(style, 500);
  };

  const unzoomPhoto = (event) => {
    let $photo = $(event.target);

    // Unshadow all photos
    $('.photo-shadow').each((index, shadow) => {
      $(shadow).css({ width: 'auto'});
    });

    let style = {
      width: '100%',
      height: '100%'
    };

    if ($photo.width() > $photo.height()) {
      style.marginLeft = '0';
    }

    $photo.animate(style, 500);
  };

  // Load Photos automatically if they are ready in props
  loadPhotos();

  return (
    <BannerContainer id="overview-house-banner" >
      <PhotosContainer className="photos-container" >
        <PrimaryPhotoContainer >
          <PrimaryPhoto src={s3 + '/Images/' + photo1} data-id={1}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></PrimaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={1} />
        </PrimaryPhotoContainer>

        <SecondaryPhotoContainer>
          <SecondaryPhoto src={s3 + '/Images/' + photo2} data-id={2}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></SecondaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={2} />
        </SecondaryPhotoContainer>
        <SecondaryPhotoContainer>
          <SecondaryPhoto src={s3 + '/Images/' + photo3} data-id={3}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></SecondaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={3} />
        </SecondaryPhotoContainer>
        <SecondaryPhotoContainer>
          <SecondaryPhoto src={s3 + '/Images/' + photo4} data-id={4}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></SecondaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={4} />
        </SecondaryPhotoContainer>
        <SecondaryPhotoContainer>
          <SecondaryPhoto src={s3 + '/Images/' + photo5} data-id={5}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></SecondaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={5} />
        </SecondaryPhotoContainer>
      </PhotosContainer>

      <CommandsContainer className="floating-commands" >
        <SocialItem>
          <Icon viewBox="0 0 24 24" fill="transparent" fill-opacity="0" stroke="currentColor" stroke-width="2.25" focusable="false" aria-hidden="true" role="presentation" stroke-linecap="round" stroke-linejoin="round">
            <Share />
          </Icon>
          Share
        </SocialItem>
        <SocialItem>
          <Icon viewBox="0 0 24 24" fill="transparent" fill-opacity="0" stroke="#484848" stroke-width="2.25" focusable="false" aria-label="Save this listing." role="img" stroke-linecap="round" stroke-linejoin="round">
            <Heart />
          </Icon>
          Save
        </SocialItem>
        <CommandItem>View Photos</CommandItem>
      </CommandsContainer>
    </BannerContainer>
  );
};

export default Banner;