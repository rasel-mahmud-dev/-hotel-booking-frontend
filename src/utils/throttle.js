
function throttle(fn, wait, id){
    let time = Date.now()

    return function (){

        // clear timeout if it not last scroll
        clearTimeout(id)

        let afterDelay = time + wait
        if(afterDelay - Date.now() < 0){
            fn()
            time = Date.now()
        }
        id = setTimeout(()=>{
            fn()
            // console.log("last scroll")
        }, 1000)
    }
}

export default throttle

