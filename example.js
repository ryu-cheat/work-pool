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