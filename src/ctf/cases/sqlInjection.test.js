const fn = require('./sqlInjection');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true, если в начале строки есть апостроф', () => {
    req.body.name = '`test';
    expect(fn(req)).toEqual(true);
});

it('должен сказать true, если есть апостроф, но не в начале строки', () => {
    req.body.name = 'test`as`';
    expect(fn(req)).toEqual(false);
});

it('должен сказать false на пустой body', () => {
    delete req.body.name;
    expect(fn(req)).toEqual(false);
});
