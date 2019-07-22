
function F(maxWorks){
    let works = [];
    let worksKeys = { }
    let worksOnFinish = { }
    let workings = [];

    let workLength = 0;
    let finishCallback = () => {};
    let progressCallback = () => {};

    function Pool () { }
    Pool.prototype.work = function (fn = function (next=()=>{}) {}, options) {
        if (!options) options = {};
        if (options.key == null) {
            options.key = Math.random() + '';
        }
        if (worksKeys[options.key]) return { remove:()=>{}, onFinish:()=>{ return {remove:()=>{}} } };
        worksKeys[options.key] = fn;

        const remove = () => {
            let worksLength = works.length;
            works = works.filter(w => w !== fn);
            
            if (worksLength != works.length) {
                -- workLength;
            }
            try{ delete worksKeys[options.key]; }catch(e){}
            try{ delete worksOnFinish[options.key]; }catch(e){}
        }
        const onFinish = (fn) => {
            worksOnFinish[options.key] = fn
            return { remove }
        }

        ++workLength;

        works.push(fn);
        doWork();
        
        return { remove, onFinish }
    };
    Pool.prototype.finish = function (callback = function () {}) {
        finishCallback = callback;
        return this;
    };
    Pool.prototype.clear = function () {
        workLength = 0;
        works = [];
        workings = [];
        worksKeys = { }
        worksOnFinish = { }
        return this;
    };
    Pool.prototype.progress = function (callback = function ({ remainder, progressing, now, max }) {}) {
        progressCallback = () =>  callback && callback({
            remainder: works.length,
            progressing: workings.length,
            now: workLength - (workings.length + works.length),
            max: workLength,
        });
        return this;
    };

    function doWork () {
        if (workings.length < maxWorks) {
            let work = works.shift();
            if (!!work) {
                const next = () => {
                    let workIndex = workings.indexOf(work);
                    workings.splice(workIndex, 1);
                    progressCallback()

                    if (works.length == 0 && workings.length == 0) {
                        finishCallback && finishCallback();
                    }else{
                        doWork();
                    }

                    for (let key in worksKeys) {
                        if (worksKeys[key] === work) {
                            worksOnFinish[key] && worksOnFinish[key]();
                            break;
                        }
                    }
                };
                workings.push(work);
                work(next);
            }
            progressCallback()
        }
    }
    
    return new Pool();
}
module.exports = F;