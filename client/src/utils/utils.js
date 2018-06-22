const stringTruncat =(str,size)=>{
    if(str && str.length>=size){
        return str.substring(0,size)+'...';
    }
    else return str;
}

export  {stringTruncat};