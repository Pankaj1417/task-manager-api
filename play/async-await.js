const add = (x,y)=>{
    return new Promise((resolve , reject)=>{
     setTimeout(()=>{
         resolve(x+y)
     },4000)
    })
 }


 const doWork = async ()=>{
     const s1 = add(3,5)
     const s2 = add(s1,3)
     const s3 = add(s2,10)
     return s3
 }

doWork().then((sum)=>{
    console.log(sum)
}).catch((e)=>{
    console.log(e)
})