import CrudLayout from "./CrudLayout";
import SellerCrud from "../auth/SellerCrud";

export default function NewProduct() {
  return (
      <CrudLayout child={<SellerCrud/>}/>
  )
}
