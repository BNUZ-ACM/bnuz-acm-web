<template>
    <div>
        <base-nav style="margin-bottom: 30px;"></base-nav>
        <Content :style="{padding: '0 200px'}">
            <Breadcrumb>
                <BreadcrumbItem to="/contest/list"><Icon type="ios-home-outline" /> 赛事列表</BreadcrumbItem>
                <BreadcrumbItem v-if="contestData.style === 1" :to="{path:'/contest/info', query:{id:contestData.contestId}}"><Icon type="ios-jet-outline" /> {{contestData.contestName}}</BreadcrumbItem>
                <BreadcrumbItem v-if="contestData.style === 0" :to="{path:'/contest/personal', query:{id:contestData.contestId}}"><Icon type="ios-jet-outline" /> {{contestData.contestName}}</BreadcrumbItem>                
                <BreadcrumbItem><Icon type="ios-paper-plane" /> 晋级名单</BreadcrumbItem>
            </Breadcrumb>
            <br>
            <h1 style="font-size: 2.5em;">
                {{contestData.contestName}} {{contestData.style | filterContestType}}
            </h1>
            <h2>
                这次比赛共晋级{{promotionSize}}人，如果没有你姓名可以登录后看到噢~
            </h2>
            <Divider/>
            <h1>晋级名单</h1>
            <Table
            :columns="columns" 
            :data="promotionList"
            no-data-text="暂时没有人晋级噢"
            ></Table>
        </Content>
    </div>
</template>

<script>
    import ContestApi from '@/http/api/Contest'
    import PromotionApi from '@/http/api/Promotion'
    import Request from '@/util/request_util'
    import util from '@/util/tool_util'
    export default {
        data () {
            return {
                contestData: {},
                promotionSize: 0,
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
                        sortable: true,
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
                        filterMethod(value, row) {
                            const senior = [1010000, 1030000, 1040000, 1050000, 1090000];
                            let id = parseInt(row.userId) % 10000000
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
                    {
                        title: '晋级状态',
                        key: 'isPromotion',
                        filters: [
                            {
                                label: '晋级',
                                value: 1,
                            },
                            {
                                label: '未晋级',
                                value: 2,
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            return row.isPromotion == value
                        }
                    },
                    {
                        title: '备注',
                        key: 'comment'
                    }
                ],
                promotionList: [],   
            }
        },
        
        filters: {
            filterDate: util.timeFilter,
            filterContestType: function(type) {
                if (type == 0) {
                    return " (个人赛)"
                } else {
                    return " (组队赛)"
                }
            },
            
        },
        methods: {
            getContestData() {
                let id = this.$route.query.id
                Request.msg(ContestApi.getContestDetail, [id], (ret) => {
                    this.contestData = ret.data.contest
                }, null, false)
            },
            getPromotionList() {
                let id = this.$route.query.id
                Request.msg(PromotionApi.getPromotionList, [id], (ret) => {
                    this.promotionList = ret.data
                    for (let i = 0; i < this.promotionList.length; i++) {
                        this.promotionList[i].isPromotion = this.filterIsPromotion(this.promotionList[i].isPromotion)
                        this.promotionList[i].userName = this.filterPromotionName(this.promotionList[i].userName)
                    }
                    this.promotionSize = this.promotionList.length
                }, null, false)
            },
            filterIsPromotion(type) {
                return type == 1 ? '晋级' : '未晋级'
            },
            filterPromotionName(name) {
                if (name == '' || name == null) {
                    return '登录后登记信息可见用户名'
                }
                return name
            }
        },
        created() {
            this.getContestData()
            this.getPromotionList()
        },
    }
</script>