/* ================================================================
 * bootstrap-autocomplete.js v2.2.1
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
    this.$hidden_input = this.$element.prev('input:hidden')
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
      this.source(label, function (items) {
        that.last_processed_source = items
      })
    }

  , initializeForHashSource: function() {
      if (this.$element.val() == '') {
        var value = this.$hidden_input.val()
        var label = this.source[value]
        this.$element.val(label)
      }
    }

  , process: function (items) {
      this.last_processed_source = items
      var labels = $.map(items, function(v) { return v })
      return Typeahead.prototype.process.apply(this, [labels])
    }

  , updater: function (label) {
      var found_values = $.map(this.last_processed_source, function (v, k) { if (v == label) return k })
      var value = found_values[0]
      if (typeof value == 'undefined') {
        label = ''
      }
      this.$hidden_input.val(value)
      return Typeahead.prototype.updater.apply(this, [label])
    }

  , blur: function (e) {
      if (typeof this.last_processed_source != 'undefined') {
        var label = this.$element.val()
        this.$element.val(this.updater(label))
      }
      return Typeahead.prototype.blur.apply(this, [e])
    }

  })


 /* AUTOCOMPLETE PLUGIN DEFINITION
  * ============================== */

  $.fn.autocomplete2 = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('autocomplete')
        , options = typeof option == 'object' && option
      if (!data) $this.data('autocomplete', (data = new Autocomplete(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.autocomplete2.defaults = $.extend({}, $.fn.typeahead.defaults, {
    source: []
  })

  $.fn.autocomplete2.Constructor = Autocomplete


 /* AUTOCOMPLETE DATA-API
  * ===================== */

  function init() {
    $('[data-provide="autocomplete"]').each(function () {
      var $this = $(this)
      $this.autocomplete2($this.data())
    })
  }

  $(function () { init() })
  $(document).on('ajaxComplete', function () { init() })

}(window.jQuery);
