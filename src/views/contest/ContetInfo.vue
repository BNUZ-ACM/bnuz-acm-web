<template>
     <div>
        <Content :style="{padding: '0 200px'}">
            <h1 style="font-size: 2.5em;">
                2018北师珠IT节ACM现场赛
            </h1>
            <h2>
                报名截止时间：2018-04-12 12:00
            </h2>
            <Divider />
            <Row>
                <Col span="8" style="color: #4169e1; padding: 0 10px;">
                    <h1>
                        已报名人员
                    </h1>
                    如果还未报名请前往报名页面进行报名，若已经报名可以直接查看页面下方信息。<br>
                    <Button type="primary" style="margin-top: 20px;">
                        查看名单
                    </button>
                </Col>
                <Col span="8" style="color: #b8860b; padding: 0 10px;">
                    <h1>
                        比赛规则及申明
                    </h1>
                    了解比赛制度和比赛规则，最终解释权归北京师范大学珠海分校 ICPC协会所有。<br>
                    <Button type="warning" style="margin-top: 20px;">
                        查看比赛规则
                    </button>
                </Col>
                <Col span="8" style="color: #ed4014; padding: 0 10px;">
                    <h1>
                        报名截止
                    </h1>
                    比赛报名已经截止，各位不用灰心，请留意下次比赛时间。
                    如真有特殊需要请联系比赛主办方。<br>
                    <Button type="error" style="margin-top: 20px;" disabled>
                        报名截止
                    </button>
                </Col>
            </Row>
            <Divider />
            <h1>已报名名单</h1><br>
            <Table border :columns="team_col" :data="team_data" height="500"></Table>
        </Content>
    </div>
</template>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>


<script>
    export default {
        data () {
            return {
                team_col: [
                    {
                        title: '队号',
                        key: 'team_id'
                    },
                    {
                        title: '队长名',
                        key: 'leader_name',
                        sortable: true,
                    },
                    {
                        title: '队伍人数',
                        key: 'count',
                        filters: [
                            {
                                label: '已满人',
                                value: 1
                            },
                            {
                                label: '待加入',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.count == 3;
                            } else if (value === 2) {
                                return row.count != 3;
                            }
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark',
                    },
                    {
                        title: '操作',
                        key: 'option',
                        fixed: 'right',
                        filters: [
                            {
                                label: '不需要密码',
                                value: 1
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.need_password != 1;
                            }
                        },
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看队伍信息'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '加入队伍')
                            ]);
                        }
                    }
                ],
                team_data: [
                    {
                        team_id: 1,
                        leader_name: 'lyt',
                        count: 3,
                        remark: '啦啦啦啦',
                        need_password: 1
                    },
                    {
                        team_id: 2,
                        leader_name: 'yqqq',
                        count: 3,
                        remark: '啦啦啦啦',
                        need_password: 0
                    },
                    {
                        team_id: 3,
                        leader_name: 'lyt',
                        count: 1,
                        remark: '啦啦啦啦',
                        need_password: 1
                    },
                    {
                        team_id: 4,
                        leader_name: 'yqqq',
                        count: 0,
                        remark: '啦啦啦啦',
                        need_password: 0
                    },
                    {
                        team_id: 5,
                        leader_name: 'lyt',
                        count: 1,
                        remark: '啦啦啦啦',
                        need_password: 1
                    },
                    {
                        team_id: 6,
                        leader_name: 'yqqq',
                        count: 1,
                        remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
                        need_password: 0
                    }
                ],
            }
        }
    }
</script>