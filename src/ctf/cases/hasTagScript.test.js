const fn = require('./hasTagScript');

let req;
beforeEach(() => {
    req = {
        body: {
            name: '',
        }
    }
});

it('должен сказать true на script без атрибутов', () => {
    req.body.name = 'as<script>123</script>as';
    expect(fn(req)).toEqual(true);
});

it('должен сказать true на script с атрибутами', () => {
    req.body.name = 'as<script type="text/javascript">123</script>as';
    expect(fn(req)).toEqual(true);
});

it('должен сказать false на не тег', () => {
    req.body.name = 'hello';
    expect(fn(req)).toEqual(false);
});
