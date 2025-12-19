/* global global */

import _ from "lodash"
import moment from "moment-timezone"
import $ from "jquery"
import { getCurrentInstance } from 'vue';
import { inject } from "vue";
const secured = inject("$secured");

let _addParameterToURI = function (uri, name, value) {
    if (uri.indexOf("?") == -1) {
        uri += "?"
    } else {
        uri += "&"
    }

    uri += encodeURI(name)
    if (!!value) {
        uri += "="
        uri += encodeURI(value)
    }

    return uri
}

export function MeasurementsStore() {
    let _from, _to, _locations, _pollen, _dayAverage
    let _baseURI = global.env.apiBase + global.conf.store.measurements.url

    this.from = function (_f) {
        _from = _f
        return this
    }

    this.to = function (_t) {
        _to = _t
        return this
    }

    this.pollen = function (_p) {
        if (Array.isArray(_p)) {
            _pollen = _p
        } else {
            _pollen = [_p]
        }
        return this
    }

    this.locations = function (_l) {
        if (Array.isArray(_l)) {
            _locations = _l
        } else {
            _locations = [_l]
        }
        return this
    }

    this.dayAverage = function () {
        _dayAverage = true
        return this
    }

    this.get = function () {

        let _t = !!secured ? global.conf.securedStore.measurements.url : _baseURI

        if (typeof _from === "number") {
            _t = _addParameterToURI(_t, "from", _from)
        }
        if (typeof _to === "number") {
            _t = _addParameterToURI(_t, "to", _to)
        }
        if (Array.isArray(_locations)) {
            _t = _addParameterToURI(_t, "locations", _.join(_locations))
        }
        if (Array.isArray(_pollen)) {
            _t = _addParameterToURI(_t, "pollen", _pollen)
        }
        if (_dayAverage === true) {
            _t = _addParameterToURI(_t, "dayAverage")
        }

        let _deferred = new $.Deferred()

        $.ajax({
            url: _t
        }).done(function (data) {
            _deferred.resolve(data)
        }).fail(function () {
            // TODO
            _deferred.reject()
        })

        return _deferred.promise()
    }
}


export function PollenStore() { }

PollenStore.prototype.get = function () {
    const app = getCurrentInstance();
    const secured = app.appContext.config.globalProperties.$secured;

    var _t = global.env.apiBase + (!!secured ? global.conf.securedStore.pollen.url : global.conf.store.pollen.url)

    var _deferred = new $.Deferred()
    $.ajax({
        url: _t
    }).done(function (pollen) {
        let _pollenStorePollenCache = _.filter(pollen, function (polle) {
            return _.has(window.pollen, polle)
        })
        _deferred.resolve(_pollenStorePollenCache)
    }).fail(function () {
        // TODO
        _deferred.reject()
    })

    return _deferred.promise()
}

let _pollenCountStorePollenCache = undefined
export function PollenCountStore() {
    this.target = global.env.apiBase + global.conf.store.pollenCurrentCount.url
}

PollenCountStore.prototype.get = function () {
    var _t = this.target

    var _deferred = new $.Deferred()

    if (!_pollenCountStorePollenCache) {
        $.ajax({
            url: _t
        }).done(function (counts) {
            _pollenCountStorePollenCache = _.filter(counts, function (count) {
                return _.has(window.pollen, count.name)
            })
            _deferred.resolve(_pollenCountStorePollenCache)
        }).fail(function () {
            // TODO
            _deferred.reject()
        })
    } else {
        _deferred.resolve(_pollenCountStorePollenCache)
    }

    return _deferred.promise()
}

export function PollenWithCurrentCountStore() { }
PollenWithCurrentCountStore.prototype.get = function () {
    var _deferred = new $.Deferred()

    new PollenStore().get().then((pollen) => {
        new PollenCountStore().get().then((pollenCount) => {
            const result = _.map(pollen, (polle) => {
                const pc = _.find(pollenCount, (c) => c.name === polle)
                return {
                    name: polle,
                    currentCount: !!pc ? pc.count : 0
                }
            })
            _deferred.resolve(result)
        })
    })

    return _deferred.promise()
}

export function LocationsStore() { }

LocationsStore.prototype.get = function (requestMimeType) {
    const app = getCurrentInstance();
    const secured = app.appContext.config.globalProperties.$secured;

    var _t = global.env.apiBase + (!!secured ? global.conf.securedStore.locations.url : global.conf.store.locations.url)
    var _deferred = new $.Deferred()

    $.ajax({
        url: _t,
        dataType: "json",
        headers: {
            Accept: requestMimeType ? requestMimeType : "application/json"
        }
    }).done(function (locations) {
        _deferred.resolve(_.sortBy(locations, (l) => l.name))
    }).fail(function () {
        // TODO
        _deferred.reject()
    })

    return _deferred.promise()
}

export function SeasonsStore() {
    this.target = global.env.apiBase + global.conf.store.seasons.url
}

SeasonsStore.prototype.get = function () {
    var _t = this.target

    var _deferred = new $.Deferred()

    $.ajax({
        url: _t,
        dataType: "json",
        headers: {
            Accept: "application/json"
        }
    }).done(function (seasons) {
        _deferred.resolve(
            _.map(seasons, function (s) {
                return {
                    from: s.from ? moment.tz(moment.unix(s.from), global.conf.timezone) : undefined,
                    to: s.to ? moment.tz(moment.unix(s.to), global.conf.timezone) : undefined,
                }
            })
        )
    }).fail(function () {
        // no notification by intention as there is a fallback to work without seasons
        _deferred.reject()
    })

    return _deferred.promise()
}

SeasonsStore.prototype.getStatistics = function (locationId, pollen) {
    var _t = this.target + "/statistics/" + locationId + "/" + pollen

    var _deferred = new $.Deferred()

    $.ajax({
        url: _t,
        dataType: "json",
        headers: {
            Accept: "application/json"
        }
    }).done(function (stats) {
        _deferred.resolve(
            stats
        )
    }).fail(function () {
        // no notification by intention as there is a fallback to work without seasons
        _deferred.reject()
    })

    return _deferred.promise()
}