<template>
    <div class="app">
        <AppHeader/>
        <div class="app-body">
            <Sidebar/>
            <main class="main">
                <breadcrumb :list="list"/>
                <div class="container-fluid">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import AppHeader from '../components/Header'
import Sidebar from '../components/Sidebar'
import Breadcrumb from '../components/Breadcrumb'

export default {
    name: 'full',
    components: {
        AppHeader,
        Sidebar,
        Breadcrumb
    },
    methods: {
    },
    computed: {
        name () {
            return this.$route.name
        },
        list () {
            return this.$route.matched
        }
    },

}
</script>
