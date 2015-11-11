'use strict';
var createStore  = require('fluxible/addons').createStore;
var Activity = require('./Activity')

var ActivitiesStore = createStore({
    storeName: 'ActivitiesStore',
    handlers: {
        'LOAD_ACTIVITIES' : 'loadAll',
    },

    loadAll: function(data) {
        this.all = data
        this.emitChange();
    },

    getAll: function () {
        return {
            all: this.all
        }
    },

    initialize: function () {
        this.all = [];
    },

    dehydrate: function () {
        return {
            all: this.all
        }
    },

    rehydrate: function (state) {
        this.all = state.all;
    }
});

ActivitiesStore.model = Activity

module.exports = ActivitiesStore;
