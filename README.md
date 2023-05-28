# Loop State

Repeat between min value and max value as seesaw.

## Classes
- StepLoopState
- LerpLoopState
- LinerLoopState
- EaseInCircLoopState
- EaseOutCircLoopState
- EaseInOutCircLoopState

## Constructor
```javascript
constructor(min, max, move, onMin, onMax, options = {})
```
### args

| name | what | default |
| -- | -- | -- |
| min | Min value | - |
| max | Max value | - |
| move | Move | - |
| onMin | Callback function on min | undefined |
| onMin | Callback function on max | undefined |
| options | Options | {} |

### options
| key | what | default |
| -- | -- | -- |
| default | start value | args.min |
| loopMode | 'none', 'restart', 'reverse' | 'reverse' |
| direction | start direction to move. set 1 or -1 | 1 |
| lerpTouch | diff value with min or max to judge finished | 0.01 |
| wait | wait time (millisecond) to start next | null |


# How to use
## simple
```javascript
const loopState = new StepLoopState(0, 100, 1)

console.log(loopState.now)

loopState.update()

console.log(loopState.now)
```

## sample
see [sample](./sample/index.html) ;-)
