import React, {Component} from 'react'
import Comment from './comment'
import Loader from './common/loader'
import {connect} from 'react-redux'
import {loadCommentsPage} from '../ac'
import {loadingCommentPagesSelector, loadedCommentPagesSelector, commentsOnPagesSelector} from '../selectors'

class CommentsPage extends Component {
    componentDidMount() {
        let {page, loadingCommentPages, loadedCommentPages, loadCommentsPage} = this.props;

        if (loadingCommentPages.indexOf(page) === -1 && loadedCommentPages.indexOf(page) === -1) {
            loadCommentsPage(page)
        }
    }

    render() {
        let {page, loadingCommentPages, loadedCommentPages, commentsOnPages} = this.props;

        if (loadingCommentPages.indexOf(page) > -1) return <Loader/>;

        if (loadedCommentPages.indexOf(page) === -1) return null;

        return (
            <ul>
                {commentsOnPages[page].map(this.getComment)}
            </ul>
        )
    }

    getComment = (commentId) => <li key={commentId}><Comment id={commentId}/></li>
}

export default connect(state => ({
    loadingCommentPages: loadingCommentPagesSelector(state),
    loadedCommentPages: loadedCommentPagesSelector(state),
    commentsOnPages: commentsOnPagesSelector(state)
}), {loadCommentsPage})(CommentsPage)