# Anticipate

Anticipate something will eventually succeed. 

A TypeScript/JavaScript implementation of [joshski/anticipate](https://github.com/joshski/anticipate).

## Use

```js
import anticipate from "@simongregory/anticipate"
```

Anticipate re-runs a function until it has failed too many times, it'll then give up and throw an error.  

By default it tries 3 times, without waiting between calls:


```js
const block = async () => { /* do something that might error */ };
const result = await anticipate(block);
```

To configure more tries, or delay by a number of milliseconds between tries pass it some configuration along with your function.

```js
const block = async () => { /* do something that might error */ };
const result = await anticipate(block, { tries: 5; millisecondsBetweenTries: 10 });
```

In use you may want to consider a wrapper method that allows you to define the particulars of your configuration: 

```js
function anticipator(block: any) {
  return async () => {
    anticipate(block, { millisecondsBetweenTries: 50 });
  };
}

it('returns a 200 status code', anticipator(async () => {
  const response = await request('http://example.com').get('/list');
  expect(response.status).toEqual(200);
}));
```

## License

Released under the MIT License. Please see the accompanying [LICENSE](LICENSE) document for details.
