let app = new Vue({
    el: '#app',
    data: {
        message: 'Введите текст с одинарными ковычками!',
        outMessage: '',
    },
    methods: {
        replaceQuotes: function () {
            console.log(this.message);
            let r = new RegExp("(\\s'\\S|\\S'\\s)", "g");
            this.outMessage = this.message.replace(r, function (str) {
                return str.replace("'", "\"")
            })
        }
    }
});