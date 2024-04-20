export default new class Helper {
    randomStr() {
        return Math.random().toString(36).substring(2, 7);
    }

    randomNumber(length) {
        return Math.random().toString().substr(2, length + 2);
    }
};
