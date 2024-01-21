<template>
    <div class="container-fluid min-vh-100 d-flex flex-column bg img-fluid">
      <MainMenu :userManager="userManager" :userProfile="userProfile"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import MainMenu from '@/components/MainMenu.vue'

    export default {
        name: 'MainMenuView',
        components: {
            MainMenu
        },
        props: {
            userManager: Object,
            userProfile: Object
        }
    }
</script>

<style scoped>

    .bg {
        background-image: url('~@/assets/MainMenu/background/background.png');
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

</style>
