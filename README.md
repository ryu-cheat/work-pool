# work-pool

work-pool은 동시에 여러 작업을 처리하는 데에 유리합니다.

```
npm install work-pool
```

```js
const Pool = require('./Pool'); // 모듈 불러오기

const P1 = Pool( 5 ); // 최대 동시 처리 갯수(5개)

P1.work(function (next) {
    // 실행할 코드 입력.

    
    next(); // 실행이 끝난 후 next 호출
})
```

# example
### example code
```js
const Pool = require('./Pool');

const P1 = Pool(3);

for (let i = 1 ; i <= 11; i ++) {
    P1.work(function(next){
        setTimeout(function(){
            console.log( new Date().toLocaleTimeString(), i);
            next();
        }, 1000);
    })
}
P1.finish(function () {
    console.log('FINISH');
});
```

### 실행결과
```js
n-ui-MacBookPro:work-pool n$ node example.js 
5:40:18 PM 1
5:40:18 PM 2
5:40:18 PM 3
5:40:19 PM 4
5:40:19 PM 5
5:40:19 PM 6
5:40:20 PM 7
5:40:20 PM 8
5:40:20 PM 9
5:40:21 PM 10
5:40:21 PM 11
FINISH
```

- P1.work( )로 동시에 실행한 11개의 함수들이 pool의 수에 따라 순차적으로 실행되었습니다.