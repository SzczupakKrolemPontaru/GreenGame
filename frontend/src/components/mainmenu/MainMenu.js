export default class MainMenu {
    constructor(userManager, userProfile) {
        this.userManager = userManager;
        this.userProfile = userProfile;
        this.scoreBoard = [];
        this.availableHats = [null];
        this.currentHat = 0;

        this.prepareScoreboard();
    }

    logout() {

    }

    getLoggerUser() {

    }

    editAccount() {

    }

    saveChanges() {

    }

    prepareScoreboard() {
        this.scoreBoard = [
            {name: "marekkox",score: 150000},
            {name: "ania18", score: 124000},
            {name: "------------", score: 0},
            {name: "------------", score: 0},
            {name: "-----------", score: 0},
            {name: "-----------", score: 0},
            {name: "-----------", score: 0},
            {name: "-----------", score: 0},
            {name: "-----------", score: 0},
            {name: "-----------", score: 0},
        ];
    }

    changeHat() {

    }

    setAvailableHats() {

    }

    displayMainMenu() {

    }

    displayPlayer() {

    }

    displayScoreBoard() {
        return this.scoreBoard;
    }

    displayHat() {

    }

    displayLevel() {

    }

    displayBooster() {

    }

}