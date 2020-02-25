const fn = require('./x10x13');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true, если \\n', () => {
    req.body.name = 'as\nas';
    expect(fn(req)).toEqual(true);
});

it('должен сказать true, если \\r', () => {
    req.body.name = 'as\ras';
    expect(fn(req)).toEqual(true);
});

it('должен сказать true, если \\r\\n', () => {
    req.body.name = 'as\r\nas';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на другое', () => {
    req.body.name = 'asas';
    expect(fn(req)).toEqual(false);
});
