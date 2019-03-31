Vue.component('search-input', {
    template: '' +
        '<div>' +
        '<label> Поиск: <input v-on:input="$emit(\'input\', $event.target.value)" type="text" title="search"></label>' +
        '</div>',
});
