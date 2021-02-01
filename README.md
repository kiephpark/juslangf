# This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## Flex
- container와 item으로 구분하며, container는 전체공간, item는 tag들의 세부 공간이라 생각하면된다.
``` html
<div class="container">
	<div class="item">helloflex</div>
	<div class="item">abc</div>
	<div class="item">helloflex</div>
</div>
```
- container는 item들의 배치와 같은 속성을 가진다.
- container의 display를 flex로 설정함으로써 자식 노드에 대한 control를 얻는다. 손자는 안됨.
- flex-wrap: ;컨테이너가 더 이상 아이템들을 한 줄에 담을 여유 공간이 없을 때 아이템 줄바꿈을 어떻게 할지 결정하는 속성입니다. (default:nowrap)
``` css
.container {
  display: flex,(inline-flex)
  flex-direction: row,(column)
  flex-wrap: nowrap, (wrap)
  flex-flow: row, nowrap;
  justify-content: flex-start (flex-end, center, space-between, space-around, space-evenly)
  align-items: stretch (flex-start, flex-end, center, baseline)
}
.item {

}
```
- flex-basis는 Flex 아이템의 최소 크기를 설정합니다(flex-direction이 row일 때는 너비, column일 때는 높이) contents의 사이즈가 flex-basis보다 크면 contents 사이즈로 된다.
- flex-grow에 들어가는 숫자의 의미는, 아이템들의 flex-basis를 제외한 여백 부분을 flex-grow에 지정된 숫자의 비율로 나누어 가짐
- flex-shrink의 기본값은 1인데 이는 flex-basis, flex-grow에 따라 폭을 조정할 수 있다. 이 값을 0으로 세팅하면 아이템의 크기가 flex-basis보다 작아지지 않기 때문에 고정폭의 컬럼을 쉽게 만들 수 있음. 고정 크기는 width로 설정합니다.
- flex: 1 1 500px; (flex-grow, flex-shrink, flex-basis) 주의할 점은 `flex:1;`과 같이 축약형으로 사용시 `flex-basis:0`이 된다.
- align-self는 align-items보다 우선권이 있어서 각 아이템별로 설정값을 따로 정할 수 있음.
- order: 1 (2,3,...) 각 아이템 별로 순서를 정할 수 있는데, 굳이...
- z-index를 아래와 같이 활용이 가능하다.
``` html
.item {
  flex-basis: auto; (0, 50%, 300px, 10rem, content)
  flex-grow: 0; (1)
}
.item:nth-child(1) { flex-grow: 1; }
.item:nth-child(2) { flex-grow: 2; }
.item:nth-child(3) { flex-grow: 1; }

.item:nth-child(1) {
	flex-shrink: 0;
	width: 100px;
}
.item:nth-child(2) {
	flex-grow: 1;
}

.item:nth-child(1) { order: 3; } /* A */
.item:nth-child(2) { order: 1; } /* B */
.item:nth-child(3) { order: 2; } /* C */

.item:nth-child(2) {
	z-index: 1;
	transform: scale(2);
}
/* z-index를 설정 안하면 0이므로, 1만 설정해도 나머지 아이템을 보다 위로 올라온다 */
```

## 유용한 문법

``` javascript
if(game.length !== 0){
  let pubScore = {
    "publisher":game[0].publisher
  };
  let gameScore = {};
  game.forEach( e => {
    if(e.date in gameScore){
      if(e.title in gameScore[e.date]){
        gameScore[e.date][e.title] += e.score;
      } else {
        gameScore[e.date][e.title] = e.score;    
      }
    } else {
      let temp = {};
      temp[e.title] = e.score;
      gameScore[e.date] = temp;
    }         
  });
  console.log(gameScore);
  pubScore["gameScore"] = gameScore;
  setPubScoreState(pubScore);
}
```