export function dynamicSort(property: any) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a:any,b:any) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export function filterNotIn(tab:[],notin: []) {
    let result = tab.slice(0);
    for(let i =0; i<tab.length;i++)
    {
        for(let j =0;j<notin.length;j++)
        {
            if(tab[i] == notin[j])
            {
                result.splice(i,1);
            }
        }

    }
    return result;
   
    }
