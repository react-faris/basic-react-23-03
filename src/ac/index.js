import {INCREMENT, DELETE_ARTICLE, SELECT_BY_DATE, SELECT_BY_PICK} from '../constants'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function selectByDate({from, to}) {
    return {
        type: SELECT_BY_DATE,
        payload: {from, to}
    }
}

export function selectByPick(picked) {
    return {
        type: SELECT_BY_PICK,
        payload: {picked}
    }
}