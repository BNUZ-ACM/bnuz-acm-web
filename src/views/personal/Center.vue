<template>
    <div>
        <Content :style="{padding: '0 200px'}" class="content-font">
            <center>
                 <Avatar 
                class="icon-large"
                :style="{background: color}" size="large">
                    <span class="icon-content">Y</span>
                </Avatar>
                <br><br>
                <p>叶启权</p>
                <p>2016届ACM协会会长</p>
                <Tooltip content="我不要做咸鱼！点击旁边按钮刷新数据~">
                    <p><B>小懒虫你已经<span style="font-size: 2em;">15</span>天没有ac了，快要成咸鱼了噢！</B></p>
                </Tooltip>
                <Tooltip content="点我更新数据">
                    <Icon type="ios-sync" size="20" style="cursor:pointer"/>
                </Tooltip>
            </center>
            <Divider orientation="left" style="font-size:1.2em;">个人信息</Divider>
            <Content :style="{padding: '0 200px'}">
                <center>
                    <Row>
                        <Col span="11">
                            <p>年级：2015级</p>
                            <p>职业类型：ACM退役选手</p>                            
                        </Col>
                        <Col span="11">
                            <p>学院&专业：信息技术学院 软件工程</p>
                            <p>部门：竞赛部</p>
                        </Col>
                    </Row>
                </center>
            </Content>
            <Divider orientation="left" style="font-size:1.2em;">OJ信息</Divider>
            
             <Row>
                <Col span="11">
                    <Card>
                        <p slot="title">HDU</p>
                        <p>Yeqiquan</p>
                        <p>Accepted: 501</p>
                        <p>Rank: 706</p>
                    </Card>
                </Col>
                <Col span="11" offset="2">
                    <Card>
                        <p slot="title">Codeforces</p>
                        <p>QuanQqqqq</p>
                        <p>Accepted: 365</p>
                        <p>Ranklist: 1621 (Specialist)</p>
                    </Card>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="11">
                    <Card>
                        <p slot="title">POJ</p>
                        <p>QuanQ</p>
                        <p>Accepted: 50</p>
                    </Card>
                </Col>
                <Col span="11" offset="2">
                    <Card>
                        <p slot="title">VJudge</p>
                        <p>QuanQ</p>
                        <p>Accepted: 189</p>
                    </Card>
                </Col>
            </Row>
        </Content>
    </div>
</template>

<script>
export default {
    data() {
        return {
            color: "#00a2ae"
        }
    }
}
</script>

<style lang="stylus">
    .icon-large {
        width: 100px !important;
        height: 100px !important;
        border-radius: 20px;
    }
    .icon-content {
        line-height: 100px !important; 
        left: calc(50% - 10px) !important;
        font-size: 3em;
    }
    .content-font {
        font-size: 1.2em;
    }
</style>
