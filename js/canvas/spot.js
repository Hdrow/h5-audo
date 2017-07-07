        function Hotspot(drawLayer, assetList, composition, ease, onUpdate, onComplete) {
            this._drawLayer = drawLayer;
            this._composition = 'source-over';
            this._ease = (ease === true);
            this._onUpdate = onUpdate;
            this._onComplete = onComplete;
            this._assetList = assetList;
            this._animationReq = null;
            this._currScale = 0;
            this._composition = composition !== undefined ? composition : _composition;
        }

        Hotspot.prototype = {
            constructor: Hotspot,
            start: function (coords, fromScale, toScale, duration) {
                var currImageId = 0;
                this._currScale = fromScale;
                var _time = 0;
                var _duration = duration || 5;
                (function draw(_self) {
                    _time += 1;
                    _self._currScale = _self._ease ? applyExpoEaseOut(fromScale, toScale, _time, _duration) : _self._currScale += 0.1;
                   // currImageId = currImageId < _self._assetList.length - 1 ? currImageId + 1 : 0;
                    var image = _self._assetList;

                    var _w = image.width * _self._currScale;
                    var _h = image.height * _self._currScale;
                    var _x = coords.x - (_w / 2);
                    var _y = coords.y - (_h / 2);

                    var ctx = _self._drawLayer.getContext('2d');
                    ctx.save();
                    ctx.globalCompositeOperation = _self._composition;
                    ctx.drawImage(image, _x, _y, _w, _h);
                    ctx.restore();

               
                    if (_self._onUpdate) {
                        _self._onUpdate();
                    }

                  
                    if (_self._currScale < toScale) {
                        _self._animationReq = window.animationFrame(function () {
                            draw(_self);
                        });
                    }
                    else {
                        _self.dispose();
                        if (_self._onComplete) {
                            _self._onComplete();
                        }
                    }
                })(this);

                function applyExpoEaseOut(fromVal, toVal, time, duration) {
                    return (toVal - fromVal) * (-Math.pow(2, -10 * time / duration) + 1) + fromVal;
                }
            },

            dispose: function () {
                this._animationReq = 0;
                this._drawLayer = null;
                while (this._assetList > 0) {
                    var child = this._assetList.shift();
                    child = null;
                }
                this._assetList = null;
                this.AssetLoader = null;
                this._instance = null;
                this._onUpdate = null;
            }
        };

