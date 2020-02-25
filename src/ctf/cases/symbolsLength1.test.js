const fn = require('./symbolsLength1');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true, если поле длиной 1', () => {
    req.body.name = '1';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на непустой body', () => {
    expect(fn(req)).toEqual(false);
});
