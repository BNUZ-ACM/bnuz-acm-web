<template>
    <Content :style="{padding: '0 200px'}">
        <h1>获奖情况</h1>
        <br>
        <Table
        :columns="columns" 
        :data="honorData"
        :row-class-name="rowClassName"></Table>
    </Content>
</template>

<style>
    .ivu-table .sliver-row td {
        background: Silver;
        /* color: #fff; */
    }
    .ivu-table .gold-row td {
        background: #f9d923;
        /* color: #fff; */
    }
    .ivu-table .bronze-row td {
        background: #c08e55;
        /* color: #fff; */
    }
</style>

<script>
export default {
    data () {
        return {
            columns: [
                {
                    title: '年份',
                    key: 'years',
                    sortable: true
                },
                {
                    title: '竞赛名称',
                    key: 'contestName',
                    filters: [
                        {
                            label: 'ICPC',
                            value: 1
                        },
                        {
                            label: 'CCPC',
                            value: 2
                        },
                        {
                            label: 'GDCPC',
                            value: 3
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        let contestName = row.contestName
                        if (value === 1) {
                            return contestName.indexOf('icpc') != -1 || contestName.indexOf('ICPC') != -1;
                        } else if (value === 2) {
                            return contestName.indexOf('CCPC') != -1 
                                || contestName.indexOf('CCPC') != -1
                                || contestName.indexOf('中国大学生') != -1;
                        } else if (value == 3) {
                            return contestName.indexOf('gdcpc') != -1 
                                || contestName.indexOf('gdcpc') != -1
                                || contestName.indexOf('广东省') != -1;
                        }
                    }
                },
                {
                    title: '奖项',
                    key: 'honor',
                    filters: [
                        {
                            label: '金奖',
                            value: 1
                        },
                        {
                            label: '银奖',
                            value: 2
                        },
                        {
                            label: '铜奖',
                            value: 3
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.honor === '金奖';
                        } else if (value === 2) {
                            return row.honor === '银奖';
                        } else if (value == 3) {
                            return row.honor === '铜奖';
                        }
                    }
                },
                {
                    title: '队员',
                    key: 'member'
                },
                {
                    title: '队名',
                    key: 'teamName'
                }
            ],
            honorData: [
                {
                    years: 2007,
                    contestName: 'ACM-ICPC亚洲区域赛成都站',
                    honor: '铜奖',
                    member: '黄敬腾 汪大伟 岑启超',
                    teamName: 'NULL'
                },
                {
                    years: 2007,
                    contestName: '广东省大学生程序设计竞赛',
                    honor: '银奖',
                    member: '周科 邹振斌 苏奕虹',
                    teamName: 'BNUEP_TribeHero'
                },
                {
                    years: 2007,
                    contestName: '广东省大学生程序设计竞赛',
                    honor: '银奖',
                    member: '薄涛 汪大炜 岑启超',
                    teamName: 'BNUEP_AC_Endless'
                },
                {
                    years: 2007,
                    contestName: '广东省大学生程序设计竞赛',
                    honor: '铜奖',
                    member: '杨潇 杨理垚 周艳飞',
                    teamName: 'BNUEP_Blackhorse'
                },
                {
                    years: 2008,
                    contestName: '广东省大学生程序设计竞赛',
                    honor: '金奖',
                    member: '杨理垚 尚鹏 杨潇',
                    teamName: 'NULL'
                },
            ]
        }
    },
    methods: {
        rowClassName (row, index) {
            if (row.honor == '金奖') {
                return 'gold-row';
            } else if (row.honor == '银奖') {
                return 'sliver-row';
            } else if (row.honor == '铜奖') {
                return 'bronze-row';
            }
            return '';
        },
    }
}
</script>


