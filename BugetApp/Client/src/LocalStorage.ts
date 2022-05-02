export default class LocalStorage
{
    itemToSave:any[] = []
    key_ct:string = '';

    constructor(storage_prefix: string ,key:string )
    {
        this.key_ct=`${storage_prefix}_${key}`;
    }

    public  AddToLocalStorage(item:any)
    {
        this.itemToSave = this.GetFromLocalStorage();
        this.itemToSave.push(item);
        window.localStorage.setItem(this.key_ct,JSON.stringify(this.itemToSave));
    }

    public  RemoveFromLocalStorage(item:any)
    {
        this.itemToSave = this.GetFromLocalStorage();
        var index = this.itemToSave.indexOf(item);
        if(index>=0)
        {
            this.itemToSave.splice(index)
        }
        window.localStorage.setItem(this.key_ct,JSON.stringify(this.itemToSave));
    }

    public  GetFromLocalStorage():any[]
    {
        if(!this.itemToSave)
        {
            let t = window.localStorage.getItem(this.key_ct);
            if(t)
            {
                this.itemToSave = JSON.parse(t);   
            }
            if(!this.itemToSave)
            {
                this.itemToSave=[];
            }
        }
        return this.itemToSave;
    }

    public ClearLocalStorage()
    {
        window.localStorage.removeItem(this.key_ct)
    }

}

// const storage_prefix='LS';
// export const LS = new LocalStorage("LS",'');