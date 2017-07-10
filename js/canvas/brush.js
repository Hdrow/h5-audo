function ibrush(options) {
	var defaults = {
		composition: 'destination-out',
		ease: true
	};
	var opts = $.extend(defaults, options);
	this._canvas = opts.canvas;
	this._image = opts.image;
	this._composition = opts.composition;
	this._ease = opts.ease;
	this._onUpdate = opts.onUpdate;
	this._onComplete = opts.onComplete;
	this._animationReq = null;
	this._currScale = 0;
} //edn func

ibrush.prototype = {
	on: function(coords, fromScale, toScale, duration) {
		fromScale = fromScale != null ? fromScale : 1;
		toScale = toScale != null ? toScale : 2.5;
		duration = duration || 5;
		var currImageId = 0;
		this._currScale = fromScale;
		var _time = 0;
		draw(this);

		function draw(_this) {
			_time += 1;
			_this._currScale = _this._ease ? applyExpoEaseOut(fromScale, toScale, _time, duration) : _this._currScale += 0.1;
			var _w = _this._image.width * _this._currScale;
			var _h = _this._image.height * _this._currScale;
			var _x = coords.x - (_w / 2);
			var _y = coords.y - (_h / 2);
			var ctx = _this._canvas.getContext('2d');
			ctx.save();
			ctx.globalCompositeOperation = _this._composition;
			ctx.drawImage(_this._image, _x, _y, _w, _h);
			ctx.restore();
			if(_this._onUpdate) _this._onUpdate();
			if(_this._currScale < toScale) _this._animationReq = requestAnimationFrame(function() {
				draw(_this);
			});
			else {
				cancelAnimationFrame(this._animationReq);
				if(_this._onComplete) _this._onComplete();
			} //edn else
		};

		function applyExpoEaseOut(fromVal, toVal, time, duration) {
			return(toVal - fromVal) * (-Math.pow(2, -10 * time / duration) + 1) + fromVal;
		}
	},
	off: function() {
		cancelAnimationFrame(this._animationReq);
		this._canvas = null;
		this._image = null;
		this._onUpdate = null;
		this._onComplete = null;
	}
};