# react-custom-hooks

These are cusotm hooks that I have created and used in various projects. They are not wrapped as a library, instead just copy the ones you need into your own projects and use them as needed

## src/data

These hooks are used to build data related hooks. They can be composed into a single hook that adds filtering, sorting and pagination as needed

TODO: Add hooks for POST, PUT, Delete that can also be composed into the main hook

## useDebounceState

Use the same as normal useState but adds a delay before the state is actually updated - useful where multiple events can happen in a very short space of time and only 1 value update is required. Also adds a third parameter for the temp value that was sent.

e.g. A search filter in an edit box, only execute the search when the user slows down

```js
const [filter, setFilter, filterValue] = useDebounceState("",500);

<input value={filterValue} onChange={(e) => setFilter(e.target.value)} />

useEffect(() => {
    // Do search
    fetch(`${url}?filter=${filter}`)
    .then(()=> {
        ....
    })
})
```

In this example the input box uses the filterValue to maintain the value being displayed, but the fetch will only execute after 500milliseconds of no changes

## useExpiringState

After a certain delay (default 500ms) the value will return to its original (default) value

Usable for popups that need to expire after a short time

```js
const [show, setShow] = useExpiringState(false, 1000);

{show && (
<div>
  This only displays for 1 seconds
</div>
)}
<button onClick={()=>setShow(true)}>Show</button>
```

## usePubSub

Simple pub sub process that can be used to pass messages

topic is used to allow different messages. Messages are sent to a topic and recieved by all subscribers to the topic

```js
const [ message, setMessage ] = useState();
const { subscribe, publish } = usePubSub("myTopic", "initial value");

useEffect(() => {
  // On component create subscribe to the topic
  subscribe((newMessage) => {
    if (newMessage !== message) {
      setMessage(newMessage);
    }
  })
},[])

publish("new value");
```

see useGlobalState for an easier method of sharing state between components

## useGlobalState

Makes a shared useState value between multiple components. If the value changes in the one component it will chnage in all components using the saame StoreName

Component 1
```js
const [vale, setValue] = useGlobalState("MyStoreName", "initial value");
```

Component 2
```js
const [vale, setValue] = useGlobalState("MyStoreName", "initial value");
```

The first component that gets created will set the initial value.
If setValue in either component is called, the value in both components will be updated

## useLogger

A drop in replacement for console that allows the turing on/off of logging based on values set in LocalStorage for a specific scope. This allows console logging to be enabled/disabled for different parts of the application based on need.

Based on logging level selected, logging will be done at that or higher levels

levels: 'debug', 'info', `log`, `warn`, `error`


```js
const logger = useLogger("Scope", "warn");

logger.log("This is a log message", "it will not be displayed"");
logger.log("This is a warn message", "it will be displayed"");

```

to set value in localstorage to affect the logging level

name: logging
value:  an object in the format
```json
{
    "scope": "level"
}
```

e.g.
```json
{
    "auth": "log",
    "routing": "error",
    "booking": "warn"
}
```

which will set any useLogging("auth") to use the "log" level, while useLogging("routing") will be set to "error" and useLogging("booking") will displays "warn" level logs
