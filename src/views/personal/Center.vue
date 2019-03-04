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
                <p>1501030107</p>
                <p>2016届ACM协会会长</p>
                <p><B>小懒虫你已经15天没有ac了，快要成咸鱼了噢！</B></p>
            </center>
            <Divider />
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
