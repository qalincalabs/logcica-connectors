import * as core from "../core/main.js"

export function extractCategoriesFromProducts(products){
  return core.uniqWith(products.map(p => p.categories).flat(),(a,b)=> a.id == b.id)

}