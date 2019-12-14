export class apiResult{
    isSuccess:boolean
    code:number;
    message:string;
    data:any;
}
export class apiError{
    code:number;
    message:string;
}

export class dataLoaderResult{
    draw?: number=0;
    recordsTotal?: number=0;
    recordsFiltered?: number=0;
    data?: any=null;
}