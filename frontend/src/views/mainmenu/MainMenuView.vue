<template>
    <div class="container-fluid min-vh-100 d-flex flex-column">
      <MainMenu/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import MainMenu from '@/components/mainmenu/MainMenu.vue'

    export default {
        name: 'MainMenuView',
        components: {
            MainMenu
        }
    }
</script>