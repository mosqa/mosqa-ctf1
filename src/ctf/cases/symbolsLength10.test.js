const fn = require('./symbolsLength10');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true, если поле длиной 10', () => {
    req.body.name = '1234567890';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на непустой body', () => {
    expect(fn(req)).toEqual(false);
});
