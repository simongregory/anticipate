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

To configure more tries, or delay by a number of seconds between tries pass it some configuration along with your function.

```js
const block = async () => { /* do something that might error */ };
const result = await anticipate(block, { tries: 5; secondsBetweenTries: 10 });
```

## License

Please see [LICENCE](LICENSE).