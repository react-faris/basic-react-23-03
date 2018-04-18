import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'
import { commentsPageCountSelector } from '../../selectors'
import PageNavBar from '../../components/page-nav-bar'
import Comments from '../../components/commets-page'

class CommentsPage extends Component {
    render() {
        let {pagesCount} = this.props;

        return (
            <div>
                <PageNavBar pagesCount={pagesCount}/>
                <Route path={"/comments/:page(\\d+)"} children={this.getCommentsPage}/>
            </div>
        )
    }

    getCommentsPage = ({ match }) => {
        if (!match) return <h1>Invalid page</h1>

        let {params: {page}} = match;
        return <Comments page={page} key={`page${page}`}/>
    }
}

export default connect(state => ({
    pagesCount: commentsPageCountSelector(state)
}))(CommentsPage)