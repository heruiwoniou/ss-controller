/**
 * Author:Herui/Administrator;
 * CreateDate:2016/2/16
 *
 * Describe:
 */
/**
 * Author:Herui/Administrator;
 * CreateDate:2016/2/16
 *
 * Describe:
 */

var TPLEngine = require('./libs/tplEngine')
var fs = require('fs')

function Render (controller) {
  this.$parent = controller
}

Render.prototype = {
  constructor: Render,
  json: function (data) {
    return {
      type: 'application/json',
      data: JSON.stringify(data)
    }
  },
  tpl: function (string, data) {
    return {
      type: 'text/html',
      data: TPLEngine.render(string, data)
    }
  },
  /* (view,data)/(data) */
  view: function () {
    var v = typeof arguments[0] === 'string',
      view = v ? arguments[0] : this.$parent.action,
      data = v ? arguments[1] : arguments[0]
    return this.tpl(base._TPLData.call(this.$parent, view), data || this.$parent.querystring)
  }
}

var base = {
  _TPLData: function (view) {
    return fs.readFileSync(this.dir + '/view/' + this.controller + '/' + view + '.html', 'utf-8')
  },
  createController: function (controller) {
    controller = controller || {}
    controller.render = new Render(controller)
    return controller
  }
}

module.exports = base
