var Env = module.exports = function(parent) {
	this._parent = parent || null;
	this._env = {};
	this._dirty = {};
}

Env.prototype.on = function(evt, callback) {
	var ahs = this._handlers ? this._handlers : (this._handlers = {});
	var ehs = ahs[evt] ? ahs[evt] : (ahs[evt] = []);

	ehs.push(callback);

	var removed = false;
	return function() {
		if (removed) return;
		ehs.splice(ehs.indexOf(callback), 1);
	}
}

Env.prototype.emit = function(evt) {
	if (!this._handlers) return;
	var ehs = this._handlers[evt];
	if (!ehs) return;
	var args = Array.prototype.slice.call(arguments, 1);
	ehs.forEach(function(eh) { eh.apply(null, args); });
}

Env.prototype.beget = function() {
	return new Env(this);
}

Env.prototype.begetFrame = function(params, values) {
	var child = this.beget();
	for (var i = 0, l = params.length; i < l; ++i) {
		child._env[params[i]] = values[i];
	}
	return child;
}

Env.prototype.isDirty = function(key) {
	return !!this._dirty[key];
}

Env.prototype.clearDirty = function() {
	this._dirty = {};
}

Env.prototype.find = function(key) {
	if (key in this._env) {
		return this;
	} else if (this._parent) {
		return this._parent.find(key);
	} else {
		throw new Error("unknown key: " + key);
	}
}

Env.prototype.has = function(key) {
	return key in this._env;
}

Env.prototype.get = function(key) {
	return this.find(key)._env[key];
}

Env.prototype.set = function(key, value) {
	var target = this.find(key);
	target._env[key] = value;
	target._dirty[key] = true;
	this.emit('set', this, key, value);
}

Env.prototype.def = function(key, value) {
	if (key in this._env) {
		throw new Error("duplicate key: " + key);
	} else {
		this._env[key] = value;
		this._dirty[key] = true;
		this.emit('define', this, key, value);
	}
}

Env.prototype.undef = function(key) {
	if (!(key in this._env)) {
		throw new Error("unknown key: " + key);
	} else {
		var val = this._env[key];
		delete this._env[key];
		this.emit('undefine', this, key, val);
	}
}
