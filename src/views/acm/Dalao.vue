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
            dalaoData: [
                {
                    year: 2007,
                    name: '周志明',
                    unit: '远光',
                },
                {
                    year: 2007,
                    name: '周志明',
                    unit: '远光',
                },
                {
                    year: 2007,
                    name: '周志明',
                    unit: '远光',
                },
                {
                    year: 2007,
                    name: '周光进',
                    unit: '东方海外',
                },
            ]
        }
    },
}
</script>


