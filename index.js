var loaders = [];

var find = function (sandbox) {
    var i, o, loder,
        length = loaders.length;
    for (i = 0; i < length; i++) {
        loder = loaders[i];
        if (loder.sandbox === sandbox) {
            o = {
                index: i,
                loader: loder
            };
            break;
        }
    }
    return o;
};

var clean = function (sandbox) {
    console.log('cleaning loader');
    $('.loading', sandbox).remove();
};

module.exports = function (loader, renderer, sandbox, done) {
    var el = $('<div class="loading"><h2>loading</h2></div>');
    sandbox.html(el);
    loader(function (err, data) {
        clean(sandbox);
        renderer(data, function (err, fn) {
            loaders.push({
                sandbox: sandbox,
                clean: fn
            });
        });
    });
    done(null, function () {
        var o = find(sandbox);
        o.loader.clean ? o.loader.clean() : clean(sandbox);
        //delete loaders[o.index];
    });
};
