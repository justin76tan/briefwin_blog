<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-username">用户名</div>
                <div class="list-email">邮箱</div>
                <div class="list-date">时间</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in user.userinfos" :key="item.userid" class="list-section">
                <div class="list-username">{{ item.username }}</div>
                <div class="list-email">{{ item.email }}</div>
                <div class="list-date">{{ item.last_login | timeYmd }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/user/modify/' + item.userid" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" @click="recover(item.userid)" href="javascript:;">恢复</a>
                    <a v-else @click="deletes(item.userid)" href="javascript:;">删除</a>
                </div>
            </div>
        </div>
        <div v-if="user.hasNext" class="settings-footer clearfix">
            <a @click="loadMore()" class="admin-load-more" href="javascript:;">加载更多</a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { showMsg } from '~utils'
// import api from '~api'
import checkAdmin from '~mixins/check-admin'

export default {
    name: 'backend-user-list',
    mixins: [checkAdmin],
    async asyncData({ store, route }, config = { page: 1 }) {
        await store.dispatch('backend/user/getUserList', {
            ...config,
            path: route.path
        })
    },
    computed: {
        ...mapGetters({
            user: 'backend/user/getUserList'
        })
    },
    mounted() {},
    methods: {
        loadMore(page = this.user.page + 1) {
            this.$options.asyncData({ store: this.$store, route: this.$route }, { page })
        },
        async recover(id) {
            const { status, data } = await this.$store.$api.put('backend/userman/userman/', { id })
            if (status === 0) {
                showMsg({
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/user/getUserList', id)
            }
        },
        async deletes(id) {
            const { status, data } = await this.$store.$api.delete('backend/userman/userman/', { id })
            if (status === 0) {
                showMsg({
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/user/getUserList', id)
            }
        }
    },
    metaInfo() {
        return {
            title: '用户列表 - Briefwin|简赢',
            meta: [{ vmid: 'description', name: 'description', content: 'Briefwin|简赢' }]
        }
    }
}
</script>
