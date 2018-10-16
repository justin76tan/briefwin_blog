import cookies from 'js-cookie'
import { inBrowser } from '~utils'

export default {
    beforeRouteEnter(to, from, next) {
        if (inBrowser && !sessionStorage.getItem('usergenre')) {
            window.location.href = '/backend'
        }
        next()
    }
}
