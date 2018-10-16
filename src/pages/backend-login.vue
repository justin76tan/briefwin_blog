<template>
    <div class="main wrap clearfix">
        <div class="home-feeds cards-wrap">
            <div class="settings-main card">
                <div class="settings-main-content">
                    <a-input title="账号">
                        <input type="text" v-model="form.username" placeholder="用户名/邮箱/手机号" class="base-input" name="username">
                        <span class="input-info error">请输入账号</span>
                    </a-input>
                    <a-input title="密码">
                        <input type="password" v-model="form.password" placeholder="密码" class="base-input" name="password">
                        <span class="input-info error">请输入密码</span>
                    </a-input>
                </div>
                <div class="settings-footer clearfix">
                    <a @click="login" href="javascript:;" class="btn btn-yellow">登录</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cookies from 'js-cookie'
import { showMsg } from '~utils'
// import api from '~api'
import aInput from '~components/_input.vue'
export default {
    name: 'backend-login',
    beforeRouteEnter(to, from, next) {
        if (sessionStorage.getItem('usergenre')) {
            window.location.href = '/backend/user/list'
        }
        next()
    },
    components: {
        aInput
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            if (!this.form.username || !this.form.password) {
                showMsg('请输入用户名和密码!')
                return
            }
            const { status, data } = await this.$store.$api.post('account/loginout/', this.form)
            if (status==0) {
                sessionStorage.setItem('usergenre', data.usergenre)
                window.location.href = '/backend/user/list'
            }
        }
    },
    metaInfo() {
        return {
            title: '管理员登录 - Briefwin|简赢',
            meta: [{ vmid: 'description', name: 'description', content: 'Briefwin|简赢' }]
        }
    }
}
</script>
