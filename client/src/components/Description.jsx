import React from 'react';
import styled from 'styled-components';
import sc from './styled/OverviewPart.jsx';
import Badge from './icons/Badge.jsx';
import $ from 'jquery';


const OverviewPart = sc.OverviewPart;
const PartHeader = sc.OverviewPartHeader;

const TitleContainer = styled.section`
  display: inline-block;
  width: 80%;
`;

const TitleHeader = styled.h1`
  margin: 0;
  font-size: 32px;
`;

const Location = styled.span`
  margin: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const HostContainer = styled.div`
  padding: 0 5px;
  position: relative;
  float: right;
  text-align: center;
  font-size: 14px;
  color: #767676;
`;

const HostPhoto = styled.img`
  height: 64px;
  width: 64px;
  background-color:#777;
  border-radius: 32px;
`;

const HostBadge = styled.div`
  position: absolute;
  top: 35px;
  right: -3px
  height:32px;
  width:32px;
`;

const Summary = styled.div`
  margin-top: 48px;
  clear: both;
  border-bottom: 1px solid #eee;
`;

const SummaryItem = styled.div`
  margin-bottom: 24px;
`;

const ItemIconContainer = styled.div`
  margin-right: 22px;
  display: inline-block;
`;

const ItemIcon = styled.img`
  margin-top:3px;
  height: 12px;
  width: 12px;
`;

const ItemDetails = styled.div`
  margin: 0;
  display: inline-block;
  vertical-align: top;
  max-width: 90%;
`;

const RoomUnit = styled.span`
  margin-right: 20px;
`;

const DescriptionContainer = styled.div`
  margin-top: 24px;
`;

const ReadMoreContainer = styled.div`
  display:none;
`;

const ReadMore = styled.button`
  margin-top: 10px;
  padding: 0px;
  color: #008489;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none !important;

  &:hover {
    text-decoration: underline;
  }
`;




const Description = ({ house = {}}) => {

  // Amazon S3 is by default. Set to local if in Env settings
  let s3 = process.env.S3_HOST || 'https://dy6au145h7uxl.cloudfront.net';

  let room = {
    guest: 0,
    bedroom: 0,
    bed: 0,
    bath: 0
  };

  const loadRoomUnitInfo = () => {
    let units = house.private_room;

    if (units) {
      room.guest = units.guest;
      room.bath = units.bath;
      if (units.bedrooms.length) {
        room.bedroom = units.bedrooms.length;

        room.bed = units.bedrooms.reduce((acc, bedroom) => {
          return acc + bedroom.beds.length;
        }, 0);
      }
    }

    //console.log('loaded room', room);
  };

  loadRoomUnitInfo();

  const handleReadMoreClick = (event) => {
    let $button = $(event.target);
    let $container = $('#read-more-container');

    if ($container.is(':visible')) {
      // then hide
      $container.fadeToggle(500, () => {
        $button.text('Read more about the space ⌄');

      });
    } else {
      // then show
      $container.fadeToggle(500, () => {
        $button.text('Hide ⌃');
      });
    }
  };

  return (
    <OverviewPart>
      <TitleContainer className="title">
        <TitleHeader>{house.title ? house.title.slice(0, 30) : ''}</TitleHeader>
        <div><Location className="location">{house.location}</Location></div>
      </TitleContainer>

      <HostContainer className="host-photo">
        <HostPhoto src={s3 + '/Images/hosts/' + (house.super_host_photo || 'default.jpg')} />
        <div>{house.super_host_name}</div>
        <HostBadge>
          <Badge />
        </HostBadge>
      </HostContainer>

      <Summary>

        <SummaryItem>
          <ItemIconContainer>
            <ItemIcon src={s3 + '/icons/house-black-icon.png'} />
          </ItemIconContainer>
          <ItemDetails>
            <PartHeader>Private room in house</PartHeader>
            <RoomUnit>{room.guest} guests</RoomUnit>
            <RoomUnit>{room.bedroom} bedrooms</RoomUnit>
            <RoomUnit>{room.bed} beds</RoomUnit>
            <RoomUnit>{room.bath} baths</RoomUnit>
          </ItemDetails>
        </SummaryItem>

        <SummaryItem>
          <ItemIconContainer>
            <ItemIcon src={s3 + '/icons/key-black-icon.png'} />
          </ItemIconContainer>
          <ItemDetails>
            <PartHeader>Great check-in experience</PartHeader>
            {house.rating}% of recent guests gave the check-in process a 5-star rating.
          </ItemDetails>
        </SummaryItem>

        <SummaryItem>
          <ItemIconContainer>
            <ItemIcon src={s3 + '/icons/medal-black-icon.png'} />
          </ItemIconContainer>
          <ItemDetails>
            <PartHeader>{house.super_host_name} is a Superhost</PartHeader>
            Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
          </ItemDetails>
        </SummaryItem>

      </Summary>

      <DescriptionContainer>
        {house.desc}
      </DescriptionContainer>
      <div >
        <ReadMoreContainer id="read-more-container" >
          <DescriptionContainer>
            <PartHeader>The Space</PartHeader>
            {house.space_desc}
          </DescriptionContainer>
          <DescriptionContainer>
            <PartHeader>Guest Access</PartHeader>
            {house.guest_desc}
          </DescriptionContainer>
          <DescriptionContainer>
            <PartHeader>Other things to note</PartHeader>
            {house.other_desc}
          </DescriptionContainer>
        </ReadMoreContainer>
        <ReadMore onClick={handleReadMoreClick} >Read more about the space ⌄</ReadMore>
      </div>
    </OverviewPart>
  );
};

export default Description;