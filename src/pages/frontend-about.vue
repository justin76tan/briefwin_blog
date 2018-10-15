<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="article-content">
                        <h3 class="about-title">关于作者</h3>
                        <div class="flex-item">
                            <div class="flex-label">姓名:</div>
                            <div class="flex-content">谭文元</div>
                        </div>
                        <div class="flex-item">
                            <div class="flex-label">年龄:</div>
                            <div class="flex-content">1982.02</div>
                        </div>
                        <div class="flex-item">
                            <div class="flex-label">职业:</div>
                            <div class="flex-content">软件研发</div>
                        </div>
                        <div class="flex-item">
                            <div class="flex-label">Github:</div>
                            <div class="flex-content"><a href="https://github.com/justin76tan" target="_blank">@justin76tan</a></div>
                        </div>
                        <div class="flex-item">
                            <div class="flex-label">技能:</div>
                            <div class="flex-content">
                                <ul class="about-ul">
                                    <li>前端开发设计</li>
                                    <li>系统架构设计</li>
                                    <li>行业解决方案</li>
                                </ul>
                            </div>
                        </div>
                        <h3 class="about-title">关于网站</h3>
                        <p>源代码: <a href="https://github.com/justin76tan/briefwin_blog" target="_blank">briefwin_blog</a> 欢迎收藏加星</p>
                        <p>本站服务端采用 django + postgresql + redis 搭建, 客户端采用 Vue2</p>
                        <p>网站分成前台和后台, 前台采用 SSR 模式渲染, 后台采用 SPA 模式</p>
                        <p>主要功能包括: 管理员, 用户, 分类, 文章, 评论, 文章点赞</p>
                        <p>主要技术栈: pwa, webpack, babel, eslint, django, postgresql, vue2, vue2-router, vuex</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right">
            <trending :trending="trending"></trending>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import metaMixin from '~mixins'
import trending from '../components/aside-trending.vue'

export default {
    name: 'frontend-about',
    async asyncData({ store }) {
        await store.dispatch('frontend/article/getTrending')
    },
    components: {
        trending
    },
    mixins: [metaMixin],
    computed: {
        ...mapGetters({
            trending: 'frontend/article/getTrending'
        })
    },
    mounted() {},
    metaInfo() {
        return {
            title: '关于 - Briefwin|简赢',
            meta: [{ vmid: 'description', name: 'description', content: 'Briefwin|简赢' }]
        }
    }
}
</script>
