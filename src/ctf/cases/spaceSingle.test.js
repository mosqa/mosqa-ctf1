const fn = require('./spaceSingle');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true одиночный пробелы', () => {
    req.body.name = ' ';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на другое', () => {
    req.body.name = 'hello';
    expect(fn(req)).toEqual(false);
});
