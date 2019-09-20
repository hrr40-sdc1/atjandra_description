import React from 'react';
import styled from 'styled-components';
import Parking from './icons/Parking.jsx';
import $ from 'jquery';


const SearchResults = ({ houses = [] }) => {

  const ResultsContainer = styled.div`
    position: absolute;
    top: 45px;
    left: -1px;
    width: 100%;
    background-color: #fff;
    /*border: {houses.length > 0 ? '1px solid #eee' : 'none'}*/
    border-radius: 0 0 5px 5px;
    z-index: 1;
  `;

  const House = styled.div`
    margin: 2px 10px;
    padding: 5px;
    display:block;
    height: 30px;
    cursor: pointer;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background-color: #e7e7e7;
    }
  `;

  const Icon = styled.img`
    margin: 6px 12px 0 0;
    float: left;
    height: 19px;
    width: 19px;
  `;

  const handleHouseClick = (houseId, event) => {
    console.log('result clicked', houseId);
  };

  const listHouses = () => {

    let s3 = process.env.S3_HOST || 'https://dy6au145h7uxl.cloudfront.net';

    // display only 10 at maximum
    let listHouses = houses.slice();

    return listHouses.map((house, ind) => {
      let title = house.title;

      return (
        <House key={house.house_id + '-summary-' + ind} title={house.title}
          onClick={handleHouseClick.bind(this, house.house_id)}>
          <Icon src={s3 + '/icons/house-black-icon.png'} />
          {title}
        </House>
      );
    });
  };


  return (
    <ResultsContainer id="search-results-container">
      {listHouses()}
    </ResultsContainer>
  );
};

export default SearchResults;