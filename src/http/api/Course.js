import { formPost, formGet } from '../base/baseHttp'

class Course {
    getCourseList() {
        return formGet('/api/course/list')
    }
    getCourseByID(courseId) {
        const data = {
            courseId
        }
        return formGet('/api/course/detail', data)
    }
}

export default new Course()