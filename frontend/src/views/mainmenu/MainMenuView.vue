<template>
    <div class="container-fluid min-vh-100 d-flex flex-column bg-secondary">
      <MainMenu :userManager="userManager" :userProfile="userProfile"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import MainMenu from '@/components/mainmenu/MainMenu.vue'

    export default {
        name: 'MainMenuView',
        components: {
            MainMenu
        },
        props: {
            userManager: Array,
            userProfile: Array,
        },
    }
</script>