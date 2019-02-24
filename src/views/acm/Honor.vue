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
        background: #c0c0c0;
        /* color: #fff; */
    }
    .ivu-table .gold-row td {
        background: rgb(243, 243, 113);
        /* color: #fff; */
    }
    .ivu-table .bronze-row td {
        background: #b4a95e;
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
                    key: 'contestName'
                },
                {
                    title: '奖项',
                    key: 'honor'
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
        }
    }
}
</script>


