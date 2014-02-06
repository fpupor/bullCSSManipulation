/**
 * @alias bullCSSManipulation
 * @author Felipe Pupo Rodrigues
 * @classDescription implementa metodos em Document, para alteração de classes css
 * algumas partes do codigo foi baseada no propio mootools "Fx.CSS"
 */
Document.implement({
	changeCSSProperty:function(selector,property,value){
		var change = {}; change[property] = value;
		document.changeCSSPropertys(selector,change);
	},
	changeCSSPropertys:function(selector,propertys){
		var selectors = selector.split(',');
		Array.each(selectors, function(selector){
			var rules = document.getCSSRule(selector);
			Array.each(rules, function(rule, i){
				Hash.each(propertys, function(value, style){
					rule.style[style] = value;
				})
			});
		});
	},
	getCSSProperty:function(selector,property){
		var ret = document.getCSSPropertys(selector);
		return (ret[property])?ret[property]:null
	},
	getCSSPropertys:function(selector){
		var rules = document.getCSSRule(selector), to = {};
		Array.each(rules, function(rule, i){
			Element.Styles.each(function(value, style){
				if (!rule.style[style] || Element.ShortStyles[style]) return;
				value = String(rule.style[style]);
				to[style] = (value.test(/^rgb/)) ? value.rgbToHex() : value;
			});
		});
		return to;
	},
	getCSSRule: function(selector){
		var getCSSRule = [];
		Array.each(document.getCSSEmbeds(), function(rules, x){
			Array.each(rules, function(rule, i){
				if (!rule.style) return;
				var selectorText = (rule.selectorText) ? rule.selectorText.replace(/^\w+/, function(m){
					return m.toLowerCase();
				}) : null;
				selectorText = selectorText.toLowerCase();
				if (!selectorText || !selectorText.test('^' + selector.toLowerCase() + '$')) return;
				getCSSRule.push(rule);
			});
		});
		return getCSSRule;
    },
    getCSSEmbeds: function(){
		var getCSSEmbeds = [];
		Array.each(document.styleSheets, function(sheet, j){
			var href = sheet.href;
			if (href && href.contains('://') && !href.contains(document.domain)) return;
			getCSSEmbeds.push(sheet.rules || sheet.cssRules);
		});
		return getCSSEmbeds;
    }
});


			



			