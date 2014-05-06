var Env = module.exports = function(parent) {
	this._parent = parent || null;
	this._env = {};
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

Env.prototype.find = function(key) {
	if (key in this._env) {
		return this;
	} else if (this._parent) {
		return this._parent.find(key);
	} else {
		throw new Error("unknown key: " + key);
	}
}

Env.prototype.get = function(key) {
	return this.find(key)._env[key];
}

Env.prototype.set = function(key, value) {
	this.find(key)._env[key] = value;
}

Env.prototype.def = function(key, value) {
	if (key in this._env) {
		throw new Error("duplicate key: " + key);
	} else {
		this._env[key] = value;
	}
}