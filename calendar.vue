<style media="screen">

.datepicker {
    width: 212px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
}
.datepicker input{
    height: 28px;
    line-height: 28px;
}
.datepicker .wrapper {
    background: #fff;
    position: absolute;
    top: 30px;
    border: 1px solid #ddd;
    z-index: 9;
}

.datepicker .panel:after {
    content: '.';
    display: block;
    visibility: hidden;
    height: 0;
    clear: both;
}

.datepicker h3 {
    text-align: center;
}

.datepicker h3 .yo-ico:first-child {
    float: left;
    margin-left: 5px;
}

.datepicker h3 .yo-ico:last-child {
    float: right;
    margin-right: 5px;
}

.datepicker span,
.datepicker i,
.datepicker em {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    float: left;
}

.datepicker em {
    width: 70px;
    line-height: 30px;
}

.datepicker i {
    width: 70px;
    line-height: 30px;
}

.datepicker span.disabled,
.datepicker i.disabled,
.datepicker em.disabled {
    color: #ddd;
}

.datepicker span.active,
.datepicker i.active,
.datepicker em.active {
    background: #1ba9ba;
    color: #fff;
}

.datepicker span.active {
    border-radius: 15px;
}

.datepicker span.disabled:hover,
.datepicker i.disabled:hover,
.datepicker em.disabled:hover {
    color: #eee;
    background: none;
}

.datepicker span:hover,
.datepicker i:hover,
.datepicker em:hover {
    background: #eee;
}

</style>

<template id="">

<div id="datepicker" class="datepicker" @mouseleave="show=false">
    <input type="text" name="name" value="{{init}}" data-edit="{{dateStr}}" readonly="true" @click="openInit()">
    <div class="wrapper" v-show="show">
        <section class="panel day" v-if="type=='day'">
            <h3>
                <b @click="changeDay(true)" class="yo-ico">《</b>
                <b @click="type='month',outMonths()">{{year}}年{{month}}月</b>
                <b @click="changeDay()" class="yo-ico">》</b>
            </h3>
            <h3>
                <span>日</span>
                <span>一</span>
                <span>二</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
            </h3>
            <span v-for="item in days" class="{{item.flag?'':'disabled'}} {{item.day-day==0?'active':''}}" track-by="$index" @click="setDay(item.day)">{{item.day}}</span>
        </section>
        <section class="panel month" v-if="type=='month'">
            <h3>
                <b @click="changeMonth(true)" class="yo-ico">《</b>
                <b @click="type='year',outYears()">{{year}}年</b>
                <b @click="changeMonth()" class="yo-ico">》</b>
            </h3>
            <em v-for="item in months" class="{{item==month?'active':''}}" track-by="$index" @click="type='day',setMonth(item)">{{item}}月</em>
        </section>
        <section class="panel year" v-if="type=='year'">
            <h3>
                <b @click="changeYear(true)" class="yo-ico">《</b>
                <b @click="">{{startYear}} - {{endYear}}</b>
                <b @click="changeYear()" class="yo-ico">》</b>
            </h3>
            <i v-for="item in years" class="{{item==year?'active':''}}" track-by="$index" @click="type='month',setYear(item)">{{item}}</i>
        </section>
    </div>
</div>

</template>

<script type="text/javascript">

var moment = require('moment');
var format = 'YYYY-MM-DD';
module.exports = {
    props: {
        type: {
            type: String,
            required: true
        },
        init: {
            type: String,
            default: new Date(),
            twoWay: true
        },
        dateStr:{
            type:String,
            twoWay:true
        }
    },
    data: function() {
        var now = typeof this.init == 'object' ? moment(this.init) : moment(this.init, format);
        return {
            days: [], //当月的天数集合
            months: [], //当年的月数集合
            years: [], //年的集合
            day: now.format('DD'), //当前的天，2016-12-25中的25
            month: now.format('MM'), //当前的月，2016-12-25中的25
            year: now.format('YYYY'), //当前的年，2016-12-25的2016
            startYear: '', //年的范围起始值
            endYear: '', //年的范围结束值
            show: false, //是否显示日历
            isEdit: false //是否在编辑中
        }
    },
    computed: {
        dateStr: function() {
            var str = moment([this.year, this.month, this.day].join('-'), format).format(format);
            if (this.isEdit) {
                this.init = str;
                this.isEdit = false;
            }
            return str
        }
    },
    methods: {
        openInit: function() {
            var today = moment(this.init, format);
            this.year = today.format('YYYY');
            this.month = today.format('MM');
            this.day = today.format('DD');
            this.show = true;
        },
        setDay: function(day) {
            this.day = day;
            this.show = false;
            this.isEdit = true;
        },
        setMonth: function(month) {
            this.month = month;
        },
        setYear: function(year) {
            this.year = year;
        },
        getToday: function() {
            this.curDate = moment().format(format);
            return this.curDate
        },
        changeDay: function(isPre) {
            var today = moment(this.dateStr, format);
            today.subtract(isPre ? 1 : -1, 'month');
            today = today.format(format).split('-');
            this.year = today[0];
            this.month = today[1];
            this.day = today[2];
            this.outDays();
        },
        changeMonth: function(isPre) {
            var today = moment([this.year, this.month, this.day].join('-'), format);
            today.subtract(isPre ? 1 : -1, 'year');
            today = today.format(format).split('-');
            this.year = today[0];
            this.month = today[1];
            this.day = today[2];
            this.outMonths();
        },
        changeYear: function(isPre) {
            var today = moment([this.year, this.month, this.day].join('-'), format);
            today.subtract(isPre ? 12 : -12, 'year');
            today = today.format(format).split('-');
            this.year = today[0];
            this.month = today[1];
            this.day = today[2];
            this.outYears();
        },
        outDays: function() {
            var days = [];
            var curDate = [this.year, this.month, this.day].join('-');
            var end = moment(curDate, format).endOf('month').day(6).format(format);
            var flag = false,
                d,
                cur;
            for (var i = 0; i < 42; i++) {
                cur = moment(curDate).startOf('month').day(i);
                d = cur.format('DD');
                if (d * 1 == 1) {
                    flag = !flag;
                }
                days.push({
                    day: d,
                    flag: flag
                });
                if (cur.format(format) == end) {
                    break;
                }
            }
            this.days = days;
        },
        outMonths: function() {
            var months = [];
            for (var i = 1; i < 13; i++) {
                months.push(i);
            }
            this.months = months;
        },
        outYears: function() {
            var year = this.year;
            var today = [year, this.month, this.day].join('-');
            var pre = moment(today, format).subtract(5, 'year').format('YYYY');
            var next = moment(today, format).subtract(-6, 'year').format('YYYY');
            var years = [];
            for (var i = pre * 1; i <= next * 1;) {
                years.push(i);
                i = i * 1 + 1;
            }
            this.startYear = pre;
            this.endYear = next;
            this.years = years;
        }
    },
    ready: function() {
        this.outDays();
    }
}

</script>
