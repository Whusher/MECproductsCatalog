import CrudLayout from "./CrudLayout";
import ProductCRUD from "../auth/ProductCrud";

export default function NewProduct() {
  return (
      <CrudLayout child={<ProductCRUD/>}/>
  )
}
