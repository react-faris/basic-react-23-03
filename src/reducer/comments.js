import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, SUCCESS,
    LOAD_COMMENTS_PAGE, START, MAX_COMMENTS_ON_PAGE} from '../constants'
import { Record, OrderedMap, Set, Map } from 'immutable'
import { arrToMap } from './utils'

const CommentRecord = Record({
    id: null,
    text: null,
    user: null
})

const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loadingCommentPages: new Set(),
    loadedCommentPages: new Set(),
    commentsOnPages: new Map(),
    pagesCount: null
})

export default (state = new ReducerRecord(), action) => {
    const { type, payload, randomId, response } = action

    switch (type) {
        case ADD_COMMENT:
            return state.setIn(['entities', randomId], new CommentRecord({
                ...payload.comment,
                id: randomId
            }))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return state.mergeIn(['entities'], arrToMap(response, CommentRecord))

        case LOAD_COMMENTS_PAGE + START:
            return state.mergeIn(['loadingCommentPages'], [payload.page]);

        case LOAD_COMMENTS_PAGE + SUCCESS:
            return state
                .deleteIn(['loadingCommentPages', payload.page])
                .mergeIn(['loadedCommentPages'], [payload.page])
                .setIn(['pagesCount'], Math.floor(response.total / MAX_COMMENTS_ON_PAGE))
                .mergeIn(['entities'], arrToMap(response.records, CommentRecord))
                .mergeIn(['commentsOnPages'], new Map({[payload.page]: response.records.map(comment => comment.id)}))

        default:
            return state
    }
}