
function F(maxWorks){
    const works = [];
    const workings = [];

    let finishCallback = null;

    function Pool () { }
    Pool.prototype.work = function (fn = function (next=()=>{}) {}) {
        works.push(fn);
        doWork();
    };
    Pool.prototype.finish = function (callback = function () {}) {
        finishCallback = callback;
    };

    function doWork () {
        if (workings.length < maxWorks) {
            let work = works.shift();
            if (!!work) {
                const next = () => {
                    let workIndex = workings.indexOf(work);
                    workings.splice(workIndex, 1);
                    if (works.length == 0 && workings.length == 0) {
                        !!finishCallback && typeof finishCallback === 'function' && finishCallback();
                    }else{
                        doWork();
                    }
                };
                workings.push(work);
                work(next);
            }
        }
    }
    
    return new Pool();
}
module.exports = F;