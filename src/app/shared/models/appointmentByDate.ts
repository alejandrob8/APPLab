export interface AppoinmentByDate{
    id: number; 
    date: string; 
    hour: number; 
    idAffiliate: { 
        id: number; 
        name: string; 
        age: string; 
        mail: string; }; 
    idTest: { 
        id: number; 
        name: string; 
        description: string; }; 
}