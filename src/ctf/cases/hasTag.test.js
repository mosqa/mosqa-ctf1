const hasTag = require('./hasTag');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true на тег', () => {
    req.body.name = '<script>1</script>';
    expect(hasTag(req)).toEqual(true);
});

it('должен сказать true на скрипт', () => {
    req.body.name = '<script>alert("1")</script>';
    expect(hasTag(req)).toEqual(true);
});

it('должен сказать false на не тег', () => {
    req.body.name = 'hello';
    expect(hasTag(req)).toEqual(false);
});
