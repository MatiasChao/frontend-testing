import { ERROR_LOGIN } from "../../constans"

export default (state, action) => {
    switch(action.type) {
        case ERROR_LOGIN:
            return {
                ...state,
                message: action.message? action.message : 'Error a iniciar sesión',
                error: true
            }
        default:
            return state
    }
}