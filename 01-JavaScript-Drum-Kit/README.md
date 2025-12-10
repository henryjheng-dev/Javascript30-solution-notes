> [Javascript30 天挑戰](https://github.com/wesbos/JavaScript30)。挑戰只能使用純 Js 來撰寫，不能使用其他框架或是 Library，總共有 30 道題，我會紀錄我挑戰過程遇到的問題和解法。

# 01 - JavaScript Drum Kit

## :eyes: Introduction

![](./drum-kit.jpg)

### Main goals

- Users can trigger corresponding drum sounds by pressing designated keys.
- Clicking a key will trigger an animation effect.
- Supports repeated clicks.

### Demo: 👉 [Click me](https://henryjheng-dev.github.io/Javascript30-solution-notes/01-JavaScript-Drum-Kit/)

## :pushpin: Key Techniques

### 1. Convert NodeList to Array

Use `Array.from` to convert the NodeList returned by querySelectorAll into an Array for use.

```javascript
const keys = Array.from(document.querySelectorAll('.key'));
```

### 2. Keyboard mapping with data-code

Map KeyboardEvent.code to the HTML data-code attribute (e.g., data-code="KeyA") to trigger the corresponding sounds and animations.

＊The author used `e.keyCode` to get the corresponding key, but I found on MDN that `e.keyCode` is deprecated, so I switched to using `e.code`.

```html
<div data-code="KeyA" class="key">
  <kbd>A</kbd>
  <span class="sound">clap</span>
</div>
```

```javascript
const key = document.querySelector(`div[data-code="${e.code}"]`);
```

### 3. Audio retrigger

Reset `audio.currentTime = 0` to allow the same audio file to be triggered rapidly and repeatedly.

```javascript
audio.currentTime = 0;
```

### 4. Visual feedback

Add the `.playing` class on keydown to drive CSS-controlled color and scale (transform) animations.

```javascript
key.classList.add('playing');
```

### 5. Transition cleanup

Use `transitionend` to listen for the end of the transform transition and remove the `.playing` class to clean up the animation styles/effects.

```javascript
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));
```

### 6. class `playing` cleanup

Because `transitionend` only fires when a property actually changes and completes its transition, holding a key may not retrigger the transform if the element is already at `scale(1.1)`, which can prevent `.playing` from being removed. To ensure it is always cleaned up, also listen for `keyup` and remove the class when the key is released.

```javascript
window.addEventListener('keyup', clearPlayingState);
```
