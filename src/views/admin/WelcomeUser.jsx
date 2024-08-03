import CrudLayout from "./CrudLayout";
import ScreenUsers from "../auth/ScreenUsers";

export default function NewProduct() {
  return (
      <CrudLayout child={<ScreenUsers/>}/>
  )
}
