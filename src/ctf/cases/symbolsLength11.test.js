const fn = require('./symbolsLength11');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true, если поле длиной 11', () => {
    req.body.name = '12345678901';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на непустой body', () => {
    expect(fn(req)).toEqual(false);
});
