const fn = require('./spaceAtMiddle');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true три пробела в середине', () => {
    req.body.name = 'as   as ';
    expect(fn(req)).toEqual(true);
});

it('должен сказать true два пробела в середине', () => {
    req.body.name = 'as  as';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на другое', () => {
    req.body.name = 'hello';
    expect(fn(req)).toEqual(false);
});

it('должен сказать false на пробелы в начале', () => {
    req.body.name = ' hello';
    expect(fn(req)).toEqual(false);
});

it('должен сказать false на пробелы в конце', () => {
    req.body.name = 'hello ';
    expect(fn(req)).toEqual(false);
});
