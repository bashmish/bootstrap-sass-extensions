/* ================================================================
 * bootstrap-autocomplete.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#autocomplete
 * ================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ================================================================ */


!function($){

  "use strict"; // jshint ;_;


  var Typeahead = $.fn.typeahead.Constructor;


 /* AUTOCOMPLETE PUBLIC CLASS DEFINITION
  * ==================================== */

  var Autocomplete = function(element, options) {
    Typeahead.apply(this, [element, options])
    this.options = $.extend({}, $.fn.autocomplete.defaults, options)
    this.label_updated = this.options.label_updated || this.label_updated
    this.$hidden_input = this.$element.prev('input')
    if (this.source_is_remote) {
      this.initializeForRemoteSource()
    } else {
      this.initializeForHashSource()
    }
  }


 /* NOTE: AUTOCOMPLETE EXTENDS BOOTSTRAP-TYPEAHEAD.js
  * ================================================= */

  Autocomplete.prototype = $.extend({}, Typeahead.prototype, {

    constructor: Autocomplete

  , initializeForRemoteSource: function() {
      var that = this,
          label = this.$element.val()
      this.source(label, function (source) {
        that.last_processed_source = prepare_source(source)
      })
    }

  , initializeForHashSource: function() {
      if (this.$element.val() == '') {
        var value = this.$hidden_input.val()
        var label = this.source[value]
        this.$element.val(label)
      }
      this.last_processed_source = prepare_source(this.source)
    }

  , process: function (source) {
      this.last_processed_source = prepare_source(source)
      var labels = $.map(this.last_processed_source, function(item) { return item[1] })
      return Typeahead.prototype.process.apply(this, [labels])
    }

  , updater: function (label) {
      var found_values = $.map(this.last_processed_source, function (item) { if (item[1] == label) return item[0] })
      var value = found_values[0]
      if (!this.options.arbitrary && typeof value == 'undefined') {
        label = ''
      }
      this.value_updated(value)
      this.$hidden_input.val(value)
      this.label_updated(label)
      return label
    }

  , label_updated: function(label) {
      // use your own one to watch for label update
    }

  , blur: function (e) {
      if (typeof this.last_processed_source != 'undefined') {
        var label = this.$element.val()
        this.$element.val(this.updater(label))
      }
      return Typeahead.prototype.blur.apply(this, [e])
    }

  })

  var prepare_source = function (source) {
    if ($.isPlainObject(source)) {
      return $.map(source, function(v, k) {
        return [[k, v]]
      })
    }
    return source
  }

 /* AUTOCOMPLETE PLUGIN DEFINITION
  * ============================== */

  var old = $.fn.autocomplete

  $.fn.autocomplete = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('autocomplete')
        , options = typeof option == 'object' && option
      if (!data) $this.data('autocomplete', (data = new Autocomplete(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.autocomplete.defaults = $.extend({}, $.fn.typeahead.defaults, {
    arbitrary: false
  })

  $.fn.autocomplete.Constructor = Autocomplete


 /* AUTOCOMPLETE NO CONFLICT
  * ======================== */

  $.fn.autocomplete.noConflict = function () {
    $.fn.autocomplete = old
    return this
  }


 /* AUTOCOMPLETE DATA-API
  * ===================== */

  function init() {
    $('[data-provide="autocomplete"]').each(function () {
      var $this = $(this)
      $this.autocomplete($this.data())
    })
  }

  $(function () { init() })
  $(document).on('ajaxComplete', function () { init() })

}(window.jQuery);
