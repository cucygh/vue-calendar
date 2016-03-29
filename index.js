var Vue = require('vue');
var vm = new Vue({
    el: '#wrapper',
    data: {
        defaultDate: '2016-03-29',
        dateType:'day',
        dateValue:'2016-03-29'
    },
    components: {
        calendar: require('./calendar.vue')
    }
});
