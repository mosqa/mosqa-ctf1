const hasTag = require('./hasTag');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true на только тег', () => {
    req.body.name = '<h1>';
    expect(hasTag(req)).toEqual(true);
});

it('должен сказать true на тег с текстом', () => {
    req.body.name = 'asas<h1>asasa';
    expect(hasTag(req)).toEqual(true);
});

it('должен сказать false на не тег', () => {
    req.body.name = 'hello';
    expect(hasTag(req)).toEqual(false);
});
