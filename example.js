const Pool = require('./Pool');

const P1 = Pool(3);


P1.progress(function ({ progressing, max, now, remainder }) {
    console.log(progressing, remainder, now, max)
})
for (let i = 1 ; i <= 11; i ++) {
    let a = P1.work(function(next){
        setTimeout(function(){
            console.log( new Date().toLocaleTimeString(), i);
            next();
        }, 1000);
    }, { key: i }).onFinish(()=>{
        console.log(i)
    })
    if (i == 11)a.remove()
}
P1.finish(function () {
    console.log('FINISH');
});