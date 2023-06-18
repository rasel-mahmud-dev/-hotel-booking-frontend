
function throttle(fn, wait, id){
    let time = Date.now()

    return function (e){

        // clear timeout if it not last scroll
        clearTimeout(id)

        let afterDelay = time + wait
        if(afterDelay - Date.now() < 0){
            fn(e)
            time = Date.now()
        }
        id = setTimeout(()=>{
            fn(e)
            // console.log("last scroll")
        }, 1000)
    }
}

export default throttle

