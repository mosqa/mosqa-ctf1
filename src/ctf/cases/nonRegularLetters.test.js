const fn = require('./nonRegularLetters');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true на смайлик', () => {
    req.body.name = 'asas 😘 ';
    expect(fn(req)).toEqual(true);
});

it('должен сказать true на @', () => {
    req.body.name = 'hello@as';
    expect(fn(req)).toEqual(true);
});

it('должен сказать true на "', () => {
    req.body.name = 'hello"as';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на <', () => {
    req.body.name = 'hello<as';
    expect(fn(req)).toEqual(false);
});

it('должен сказать false на русские символы', () => {
    req.body.name = 'привет mosqa';
    expect(fn(req)).toEqual(false);
});
