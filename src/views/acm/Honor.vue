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
import { getHonorList } from '@/http/api/Honor'

export default {
    data () {
        return {
            honorType: ['ICPC', 'CCPC', 'GDCPC'],
            prizeType: ['优胜奖', '金奖', '银奖', '铜奖', '冠军', '亚军', '季军'],
            columns: [
                {
                    title: '年份',
                    key: 'year',
                    sortable: true
                },
                {
                    title: '竞赛名称',
                    key: 'name',
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
                        return value === row.type
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
                    key: 'players'
                },
                {
                    title: '队名',
                    key: 'name'
                }
            ],
            honorData: []
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
        async getAllHonorData() {
            const data = await getHonorList();
            if (data.status) {
                this.honorData = data.data.list
                for (let i = 0; i < this.honorData.length; i++) {
                    this.honorData[i].years = this.honorData[i].year
                    this.honorData[i].honor = this.filterPrizeType(this.honorData[i].prize)
                }
            }
        },
        filterPrizeType(type) {
            return this.prizeType[type]
        },

    },
    created() {
        console.log("in created")
        this.getAllHonorData()
    }
}
</script>


