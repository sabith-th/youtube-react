import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { VideoList } from "../../components/VideoList/VideoList";
import { getSearchParam } from "../../services/url";
import * as searchActions from "../../store/actions/search";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import {
  getSearchNextPageToken,
  getSearchResults
} from "../../store/reducers/search";
import "./Search.scss";

export class Search extends React.Component {
  render() {
    return (
      <VideoList
        bottomReachedCallback={this.bottomReachedCallback}
        showLoader={true}
        videos={this.props.searchResults}
      />
    );
  }

  componentDidMount() {
    if (!this.getSearchQuery()) {
      this.props.history.push("/");
    }
    this.searchForVideos();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.youtubeLibraryLoaded !== this.props.youtubeLibraryLoaded) {
      this.searchForVideos();
    }
  }

  searchForVideos() {
    const searchQuery = this.getSearchQuery();
    if (this.props.youtubeLibraryLoaded) {
      this.props.searchForVideos(searchQuery);
    }
  }

  getSearchQuery() {
    return getSearchParam(this.props.location, "search_query");
  }

  bottomReachedCallback = () => {
    if (this.props.nextPageToken) {
      this.props.searchForVideos(
        this.getSearchQuery(),
        this.props.nextPageToken,
        25
      );
    }
  };
}

const mapStateToProps = (state, props) => {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    searchResults: getSearchResults(state),
    nextPageToken: getSearchNextPageToken(state)
  };
};

const mapDispatchToProps = dispatch => {
  const searchForVideos = searchActions.forVideos.request;
  return bindActionCreators({ searchForVideos }, dispatch);
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
