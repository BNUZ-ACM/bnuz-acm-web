<template>
    <Content :style="{padding: '0 200px'}">
        <h1>历届毕业</h1>
        <br>
        <Table
        :columns="columns" 
        :data="dalaoData"></Table>
    </Content>
</template>

<script>
import { getDalaoList } from '@/http/api/Dalao'

export default {
    data () {
        return {
            columns: [
                {
                    title: '年份',
                    key: 'year',
                    sortable: true
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '经历与现况',
                    key: 'unit'
                },
            ],
            dalaoData: []
        }
    },
    methods: {
        async getAllDalaoData() {
            let data = await getDalaoList()
            if (data.status) {
                this.dalaoData = data.data.list
            }
        }
    },
    created() {
        this.getAllDalaoData()
    }
}
</script>


