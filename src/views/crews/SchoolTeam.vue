<template>
    <div>
        
        <Content :style="{padding: '0 200px'}">
            
            <h1 class="big-title">
                ACM-ICPC校队
            </h1>
            <Divider />      
            <div>
                <Anchor :affix="true" show-ink 
                :bounds="10" 
                style="float:right; font-size: 1.5em;">
                    <Content :style="{padding: '0 20px'}">
                        <AnchorLink href="#team-2017" title="2017级校队" />
                        <AnchorLink href="#team-2016" title="2016级校队" />
                        <AnchorLink href="#team-2015" title="2015级校队" />
                        <AnchorLink href="#team-2014" title="2014级校队" />
                        <AnchorLink href="#team-2013" title="2013级校队" />
                        <AnchorLink href="#team-2012" title="2012级校队" />
                        <AnchorLink href="#team-2011" title="2011级校队" />
                    </Content>
                    
                </Anchor>
                <Timeline>
                    <TimelineItem id="team-2017">
                        <p class="time time-size">2017级</p>
                        <Row>
                            <Col span="6">
                                <p class="content time-content-size">
                                    <Badge text="1425" class-name="badge-logo-spe">
                                        <a href="#" class="demo-badge">
                                            <Avatar shape="square" size="large" src="http://userpic.codeforces.com/678899/title/40f455f36850f760.jpg"></Avatar>
                                        </a>
                                    </Badge>
                                    陈仰焦 
                                    <Tag color="#20b2aa">anthony1314</Tag>
                                </p>
                                <p class="content time-content-size">
                                    <Badge text="1525" class-name="badge-logo-spe">
                                        <a href="#" class="demo-badge">
                                            <Avatar shape="square" size="large" src="http://userpic.codeforces.com/693157/title/7d7922bb0cb66f5.jpg"></Avatar>
                                        </a>
                                    </Badge>
                                    曾庆旺 <Tag color="#20b2aa">HandsomeZeng</Tag>
                                </p>
                                <p class="content time-content-size">
                                    <Badge text="1341" class-name="badge-logo-spe">
                                        <a href="#" class="demo-badge">
                                            <Avatar shape="square" size="large" icon="ios-person"></Avatar>
                                        </a>
                                    </Badge>
                                    郑景仁 <Tag color="#20b2aa">zheng835059695</Tag>
                                </p>
                            </Col>
                            <Col span="12">
                                <img alt="2017校队" src="../../assets/team/2018.jpg" width="500" style="top: 0">
                            </Col>
                        </Row>
                        
                    </TimelineItem>
                    <TimelineItem id="team-2016">

                        <p class="time time-size">2016级</p>
                        <Row>
                            <Col span="6">
                                <p class="content time-content-size">
                                    林永涛 <Tag color="#20b2aa">LinZhiQ</Tag>
                                </p>
                                <p class="content time-content-size">
                                    黄浩荣 <Tag color="#228b22">HarryBlackCatQAQ</Tag>
                                </p>
                            </Col>
                            <Col span="12">
                                <img alt="2016校队" src="../../assets/team/2017.jpg" width="500">
                            </Col>
                        </Row>
                    </TimelineItem>
                    <TimelineItem id="team-2015">
                        <p class="time time-size">2015级</p>
                        <Row>
                            <Col span="6">
                                <p class="content time-content-size">
                                    叶启权 <Tag color="#4169e1">QuanQqqqq</Tag>
                                </p>
                                <p class="content time-content-size">
                                    叶宏扬 <Tag color="#228b22">nnnnnox</Tag>
                                </p>
                                <p class="content time-content-size">
                                    周琪斌 <Tag color="#228b22">zacm564</Tag>
                                </p>
                            </Col>
                            <Col span="12">
                                <img alt="2015校队" src="../../assets/team/2016.jpg" width="500">
                            </Col>
                        </Row>
                        
                    </TimelineItem>
                    <TimelineItem id="team-2014">
                        <p class="time time-size">2014级</p>
                        <Row>
                            <Col span="6">
                                <p class="content time-content-size">
                                    郑东吴 <Tag color="#20b2aa">Wolf_Zheng</Tag>
                                </p>
                                <p class="content time-content-size">
                                    邱拓先 <Tag color="#20b2aa">Tosh</Tag>
                                </p>
                                <p class="content time-content-size">
                                    黎政文 <Tag color="#228b22">lzwings</Tag>
                                </p>
                            </Col>
                            <Col span="12">
                                <!-- <img alt="2015校队" src="../../assets/team/2016.jpg" width="500"> -->
                            </Col>
                        </Row>
                    </TimelineItem>
                    <TimelineItem id="team-2013">
                        <p class="time time-size">2013级</p>
                        <Row>
                            <Col span="6">
                                <p class="content time-content-size">
                                    陈思佳 <Tag color="#20b2aa">_Tachibana_Kanade_</Tag>
                                </p>
                                <p class="content time-content-size">
                                    蔡佳城
                                </p>
                                <p class="content time-content-size">
                                    赵天宇
                                </p>
                            </Col>
                            <Col span="12">
                                <!-- <img alt="2015校队" src="../../assets/team/2016.jpg" width="500"> -->
                            </Col>
                        </Row>
                    </TimelineItem>
                    <TimelineItem id="team-2012">
                        <p class="time time-size">2012级</p>
                        <Row>
                            <Col span="6">
                                <p class="content time-content-size">
                                    渠慧帆 <Tag color="#228b22">CrazySona</Tag>
                                </p>
                            </Col>
                            <Col span="12">
                                <!-- <img alt="2015校队" src="../../assets/team/2016.jpg" width="500"> -->
                            </Col>
                        </Row>
                    </TimelineItem>
                    <TimelineItem id="team-2012">
                        <p class="time time-size">2011级</p>
                        <Row>
                            <Col span="6">
                                <p class="content time-content-size">
                                    张盛东
                                </p>
                                <p class="content time-content-size">
                                    何俊艺
                                </p>
                            </Col>
                            <Col span="12">
                                <!-- <img alt="2015校队" src="../../assets/team/2016.jpg" width="500"> -->
                            </Col>
                        </Row>
                    </TimelineItem>
                </Timeline>
            </div>      
            
        </Content>
        
    </div>
</template>

<style lang="stylus">
    .time-size {
        font-size: 2em;
        font-weight: bold;
    }
    .time-content-size {
        padding-top: 20px;
        font-size: 1.3em;
    }
    .badge-logo-spe {
        background: #f56a00 !important;
    }
    .badge-logo-exp {
        background: #4169e1 !important;
    }
    .badge-logo-pup {
        background: #228b22 !important;
    }
</style>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    
})
</script>
