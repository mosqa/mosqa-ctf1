const fn = require('./symbolsLength9');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true, если поле длиной 9', () => {
    req.body.name = '123456789';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на непустой body', () => {
    expect(fn(req)).toEqual(false);
});
