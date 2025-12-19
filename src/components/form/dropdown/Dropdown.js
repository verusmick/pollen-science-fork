import _ from "lodash"
import $ from "jquery"

import "bootstrap-select"
import "bootstrap-select/dist/css/bootstrap-select.css"
import { defineComponent } from "vue";


export default defineComponent({
    name: "Dropdown",
    components: {},
    data: function () {
        return {
            items: [],
            selected: !!this.preselected ? this.preselected : (this.multiselect ? [] : undefined),
            previousSelection: undefined
        }
    },
    props: {
        multiselect: {
            type: Boolean,
            required: false,
            default: false
        },
        store: {
            type: Object,
            required: true
        },
        labelProvider: {
            type: Function,
            required: true
        },
        sortByProvider: {
            type: Function,
            required: false
        },
        filterAllSelection: {
            type: Function,
            required: false
        },
        preselected: {
            required: false
        },
        preselectedId: {
            required: false
        },
        preselectedFunction: {
            required: false
        },
        label: {
            type: String,
            required: false,
            default: ""
        }
    },
    watch: {
        selected: function (item) {
            this.$emit("update-selected", item)
        }
    },
    methods: {
        selectAll: function (e) {
            if (this.selected.length !== 0) {
                this.previousSelection = this.selected
            }
            if (typeof this.filterAllSelection === "function") {
                e.preventDefault()
                this.selected = _.map(this.filterAllSelection(this.items), (item) => item.id)
            }
        },
        selectPrevious: function (e) {
            if (!!this.previousSelection) {
                this.selected = this.previousSelection
                this.previousSelection = undefined
            }
        }
    },
    mounted: function () {
        this.store.get().then(_.bind(function (items) {
            if (this.sortByProvider) {
                items = _.sortBy(items, (item) => this.sortByProvider(item, items))
            }

            _.each(items, _.bind(function (item) {
                this.items.push({
                    label: this.labelProvider(item),
                    id: item
                })
            }, this))

            if (!this.multiselect && this.selected === undefined) {
                // for non-multiselect
                // nothing preselected => try to find something with preselectedId; select first entry else 
                this.selected = _.find(items, (i) => i.id === this.preselectedId) || items[0]
            } else if (this.multiselect && typeof this.preselectedFunction === "function") {
                // there is a function that returns preselected entries
                this.selected = this.preselectedFunction(items);
                this.$emit("update-selected", this.selected)
                this.$emit("component-mounted")
            } else if (this.multiselect && this.selected.length === 0) {
                // no-ops by intention
            } else {
                // something preselected => emit event
                this.$emit("update-selected", this.selected)
                this.$emit("component-mounted")
            }

            if (this.multiselect) {
                $(this.$refs.select).selectpicker();
            }
        }, this))
    },
    updated: function () {
        $(this.$refs.select).selectpicker("refresh");
    }
})