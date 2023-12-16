<template>
    <div class="row border flex-grow-1">

        <div class="col-3 border">

            <div class="row border h-80">
                <div class="col">
                    <div class="h3">TOP 10 Scoreboard</div>
                    <ol class="list-group list-group-numbered">
                        <li v-for="player in mainMenuInstance.displayScoreBoard()" :key="player" class="list-group-item list-group-item-dark">{{player.name}} {{player.score}}</li>
                    </ol>
                </div>
            </div>

            <div class="row border h-20">
                <div class="col">

                </div>
            </div>

        </div>

        <div class="col-7 border">

            <div class="row border h-90 my-3">

                <div class="col">
                    <div class="row border h-15">

                        <div class="col">
                            <div class="row h-100 d-flex flex-row justify-content-center">
                                <div class="col-2 h-100 border">
                                    hat
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row border h-70">
                        <div class="col">

                            <div class="row h-100 d-flex flex-row justify-content-between align-items-center">
                                <div class="col-2 border h-20">
                                    arrow left
                                </div>
                                <div class="col-6 h-100 border">
                                    player
                                    <div class="row h-80 d-flex flex-row justify-content-center align-items-end">
                                        <div class="col-4 h-20 border">
                                            accept hat
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 border h-20">
                                    arrow right
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="row border h-15">
                        <div class="col">
                            player info
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="col-2 border">

            <div class="row border h-10 d-flex row-flex justify-content-end">
                <div class="col-8 border h-70">
                    player name
                </div>
            </div>

            <div class="row border h-40">
                <div class="col">
                    blank
                </div>
            </div>

            <div class="row border align-items-center h-50 d-flex row-flex justify-content-end">
                <div class="col border h-40">

                    play button
                    <div class="row h-80 align-items-end d-flex row-flex justify-content-start">
                        <div class="col-4 border h-40">
                            booster
                        </div>
                    </div>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import MainMenu from './MainMenu';
    export default {
        name: 'MainMenu',
        props: {
            userManager: Array,
            userProfile: Array,
        },
        computed: {
            mainMenuInstance() {
                return new MainMenu(this.userManager, this.userProfile);
            },
        }
    }

</script>

<style scoped>

    .h-10 {
        height: 10%;
    }
    .h-15 {
        height: 15%;
    }
    .h-20 {
        height: 20%;
    }
    .h-40 {
        height: 40%;
    }

    .h-60 {
        height: 70%;
    }
    .h-70 {
        height: 70%;
    }
    .h-80 {
        height: 80%;
    }

    .h-90 {
        height: 90%;
    }

</style>
