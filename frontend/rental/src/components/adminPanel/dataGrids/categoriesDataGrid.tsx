import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const CategoriesDataGrid = () => {
  //get categories
  const { categoryStore } = useStores();
  useEffect(() => {
    categoryStore
      .fetchCategories()
      .then(() => console.log(toJS(categoryStore.allCategories)));
  }, [categoryStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false },
    { field: "visible", headerName: "Visible" },
    { field: "name", headerName: "Name", editable: true },
  ];

  let display = [];
  for (let i = 0; i < categoryStore.allCategories.length; i++) {
    display.push({
      id: categoryStore.allCategories[i].id,
      visible: categoryStore.allCategories[i].visible,
      name: categoryStore.allCategories[i].code,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     visible: true,
  //     name: "test1"
  //   },
  //   {
  //     id: 2,
  //     visible: true,
  //     name: "test2"
  //   }
  // ]

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        rows={display}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default observer(CategoriesDataGrid);