let contacts = new Vue({
    el: '#contacts',
    data: {
        nameStyle: {},
        phoneStyle: {},
        emailStyle: {},
        name: {
            data: '',
            style: {},
            check: false,
        },
        phone: {
            data: '',
            style: {},
            check: false,
        },
        email: {
            data: '',
            style: {},
            check: false,
        },
        text: '',
    },
    methods: {
        send: function () {
            if (this.name.check && this.phone.check && this.email.check) {
                alert('Сообщение отправлено!');
            } else {
                alert('Поля заполнены некоректно!');
            }
        },
        checkName: function () {
            check(/^[а-яА-Яa-zA-Z]+$/, this.name);
        },
        checkPhone: function () {
            check(/^\+7\(\d{3}\)\d{3}-\d{4}$/, this.phone);
        },
        checkEmail: function () {
            check(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/, this.email);
        },
    }
});

function check(regexp, prop) {
    if (regexp.test(prop.data)) {
        prop.style = {
            background: 'rgba(0, 255, 0, 0.5)',
        };
        prop.check = true;
    } else {
        prop.style = {
            background: 'rgba(255, 0, 0, 0.5)',
        };
        prop.check = false;
    }
}