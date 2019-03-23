import { formPost, formGet } from '../base/baseHttp'

class Scholar {
    getScholarListByID(courseId) {
        const data = {
            courseId
        }
        return formGet('/api/scholars/list', data)
    }
    cancelCourse(courseId) {
        const data = {
            courseId
        }
        return formPost('/api/scholars/cancelCourse', data)
    }
    signUpCourse(courseId) {
        const data = {
            courseId
        }
        return formPost('/api/scholars/signUpCourse', data)
    }
}

export default new Scholar()