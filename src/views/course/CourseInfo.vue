<template>
    <Content :style="{padding: '0 200px'}">
        <h1 style="font-size: 3em;">{{courseInfo.courseName}}</h1>
        <span @click="showLoginDialog = true"><Button icon="ios-bulb-outline" type="primary">报名参加</Button></span>
        <Divider />
        <h1>课程说明</h1>
        <Card class="course-font-size" style="width:100%; margin-top: 10px; margin-bottom: 10px;">
            为了提高新生赛比赛质量，学院将新生赛提高了一个层次，规则如下：<br>
            本次有6周培训，将在10月12号星期五晚上10、11和12节进行第一次培训<br>
            不出现意外的情况下，在11月16号周五晚12节后培训结束<br>
            6次培训需要来4次以上，如果有不满足条件的，ACM新生赛并不会给予相应课程的加分<br>
        </Card>
        <h1>课程大纲</h1>
        <Card class="course-font-size" style="width:100%; margin-top: 10px; margin-bottom: 10px;">
            将会在两次课时内完成C语言的大概讲解<br>

            两周课时讲解内容为：数组，字符串，指针，结构体<br>

            接下来的课时将会讲基本算法，如递归，队列，栈，堆，深度和广度优先搜索，并查集，二分搜索等基础算法<br>

            课程将会由ACM协会内部成员组织<br>

            课程内容包括理论与实践，基本内容为讲述理论知识，在HDU等OJ上进行题目实践与运用<br>
        </Card>
        <h1>课程奖励</h1>
        <Card class="course-font-size" style="width:100%; margin-top: 10px; margin-bottom: 10px;">
            会向各科C语言老师申请课堂加分<br>
        </Card>
        <h1>课程奖励</h1>
        <Card class="course-font-size" style="width:100%; margin-top: 10px; margin-bottom: 10px;">
            404 NOT FOUND<br>
            也就是惊喜啦~嘻嘻<br>
        </Card>
        <br>
        <h1>已报名名单</h1>
        <Divider />
        <Table
        :columns="columns" 
        :data="scholarList"></Table>
        <course-dialog 
        :formVisible.sync="showLoginDialog" 
        :isSignUp="true"
        :title="'课程报名'"
        :grade="20"
        :isUpdate.sync="isUpdate"
        />
    </Content>
</template>

<script>
import CourseApi from '@/http/api/Course'
import ScholarApi from '@/http/api/Scholar'
import Request from '@/util/request_util'
import util from '@/util/tool_util'

export default {
    data () {
        return {
            showLoginDialog: false,
            courseId: "",
            isUpdate: false,
            columns: [
                {
                    type: 'index',
                    width: 120,
                    align: 'center',
                    sortable: true
                },
                {
                    title: '学号',
                    key: 'userId',
                    align: 'center', 
                    filters: [
                        {
                            label: '计科',
                            value: 1
                        },
                        {
                            label: '软件',
                            value: 2
                        },
                        {
                            label: '电子',
                            value: 3
                        },
                        {
                            label: '数媒',
                            value: 4
                        },
                        {
                            label: '计科2+2',
                            value: 5
                        },
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        const senior = [1010000, 1030000, 1040000, 1050000, 1090000];
                        let id = parseInt(row.userId) % 10000000
                        console.log(id)
                        for (let i = 0; i < 4; i++) {
                            if (senior[i] <= id && id < senior[i + 1]) {
                                return i + 1 === value
                            }
                        }
                        return value === 5
                    }                   
                },
                {
                    title: '名字',
                    key: 'userName',
                    align: 'center',                    
                },
            ],
            scholarList: [],
            courseInfo: {}
        }
    },
    methods: {
        async getScholarList() {
            Request.msg(ScholarApi.getScholarListByID, [this.$route.query.id], (ret) => {
                console.log(ret.data.list)
                this.scholarList = ret.data.list
            }, null, false)
        },
        async getCourseInfo() {
            Request.msg(CourseApi.getCourseByID, [this.$route.query.id], (ret) => {
                console.log(ret.data)
                this.courseInfo = ret.data
            })
        },
    },
    created() {
        this.getScholarList()
        this.getCourseInfo()
    },
    watch: {
        isUpdate(nVal, oVal) {
            if (nVal == true) {
                nVal = false
                this.getScholarList()
            }
        }
    }
}
</script>

<style>
    .course-font-size {
        font-size: 1.5em;
    }
</style>


