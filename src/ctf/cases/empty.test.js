const fn = require('./empty');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true на пустое поле', () => {
    expect(fn(req)).toEqual(true);
});

it('должен сказать true на отсутствие поля', () => {
    delete req.body.name;
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на не пустое поле', () => {
    req.body.name = 'hello';
    expect(fn(req)).toEqual(false);
});
