import CrudLayout from "./CrudLayout";
import SalesCrud from "../auth/SalesCrud";

export default function NewProduct() {
  return (
      <CrudLayout child={<SalesCrud/>}/>
  )
}
