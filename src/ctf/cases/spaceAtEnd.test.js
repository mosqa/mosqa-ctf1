const fn = require('./spaceAtEnd');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true один пробел в конце', () => {
    req.body.name = 'asas ';
    expect(fn(req)).toEqual(true);
});

it('должен сказать true два пробела в конце', () => {
    req.body.name = 'asas  ';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на другое', () => {
    req.body.name = 'hello';
    expect(fn(req)).toEqual(false);
});
