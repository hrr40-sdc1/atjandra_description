import React from 'react';
import styled from 'styled-components';
import Lens from './icons/Lens.jsx';
import SearchResults from './SearchResults.jsx';
import $ from 'jquery';
import _ from 'underscore';

const SearchContainer = styled.div`
  margin: 16px 16px 16px 0;
  padding: 0 10px;
  display: inline-block;
  position: relative;
  vertical-align: top;
  height: 48px;
  width: 36%;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0px 2px 4px #eee;
`;

const Icon = styled.svg`
  margin 16px 5px;
  height:18px;
  width:18px;
  display:inline-block;
  fill:currentColor;
`;

const SearchInput = styled.input`
  margin: 10px;
  display:inline-block;
  vertical-align: top;
  height: 26px;
  width: 80%;
  font-size: 17px;
  font-weight: 600;
  border: none;
  outline: none;
`;

class Search extends React.Component {

  constructor() {
    super();

    this.qry = '';

    this.state = {
      houses: []
    };

    // Amazon Server HOST will be by default. Set to local if in Env settings
    this.host = process.env.HOUSEMANIA_HOST || 'http://ec2-34-219-231-48.us-west-2.compute.amazonaws.com:3010';
  }

  loadHouses(qry) {
    this.searchHouses(qry, (data) => {
      // if by the time results return, the query has changed to less than 2 chars
      if (this.qry.length < 2) {
        this.setState({
          houses: []
        });

      } else {
        this.setState({
          houses: data
        });
      }
    });
  }

  searchHouses(qry, callback) {
    var host = this.host;

    // $.ajax({
    //   method: 'GET',
    //   url: host + '/houses/search/' + qry,
    //   contentType: 'application/json',
    //   cache: false,
    //   success: callback,
    //   error: (err) => {
    //     console.log('error searching for houses', err);
    //   }
    // });
  }

  handleSearch(event) {
    const qry = event.target.value;
    this.qry = qry;

    // skip search for qry less than 2 chars
    if (qry.length < 2) {
      this.setState({
        houses: []
      });
      return;
    }

    var debounced = _.debounce(
      this.loadHouses.bind(this, qry)
      , 500);

    debounced();
  }

  handleEnterSearch(event) {
    $('#overview-house-search').animate({ width: '45%' });
  }

  handleQuitSearch(event) {
    console.log('quit search');
    $('#overview-house-search').animate({ width: '35%' });
    this.setState({
      houses: []
    });
  }

  render() {
    return (
      <SearchContainer id="overview-house-search" >
        <Icon viewBox="0 0 16 16" role="presentation" aria-hidden="true" focusable="false" >
          <Lens />
        </Icon>
        <SearchInput name="overview-qry" placeholder="Search"
          onChange={this.handleSearch.bind(this)} type="text"
          onFocus={this.handleEnterSearch.bind(this)}
          onBlur={this.handleQuitSearch.bind(this)} />

        <SearchResults houses={this.state.houses}/>
      </SearchContainer>

    );
  }
}

export default Search;