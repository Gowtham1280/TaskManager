// function Anagram(str1,str2){
//         let counter={};
//         for(let letters of str1){
//             counter[letters]=(counter[letters]||0)+1;
//         }
//         for(let letters of str2){
//             if(str1.length!=str2.length){
//                 return "not an Anagram";
//             }
//             counter[letters]=counter[letters]-1;
//         }
//         return 'Yes it is Anagram';
// }

// const ans=Anagram('Gowtham','mahtwoG');
// console.log(ans);





//                             j
// 1,2,3,4,5,6,7,8,6,6,7,7,8,8
//               i



// i=0
// j=1;
// while(j<a.length)
//     if(a[i]==a[j])
//             j++;
//     if(a[i]!==a[j])
//         i.  i++
//         ii. a[i]=a[j];


 
        
function dubNums(arr){
    let i=0,j=1;
    if(arr.length==0)return "ohoo Empty Array!"
    while(j<arr.length){
        if(arr[i]==arr[j]){
            j++;
        }
        if(arr[i]!==arr[j]){
            i++;
            arr[i]=arr[j];
        }
    }
    return i;
}

const ans=dubNums([1,1,2,3,3,4,5,6,6,6,7,7,8,8,8,9])
console.log(ans)







                  i
// [1,2,3,4,3,5,4,6,7,8,9]

// i=0 to len-n+1
//   j=i to n
//     if(j>a.len)
//         return;
//     sum+=a[j];