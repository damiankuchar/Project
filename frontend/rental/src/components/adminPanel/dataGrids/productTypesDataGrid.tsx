import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import Constants from "../../../constants/Constants";

const ProductTypesDataGrid = () => {
  //get order status
  const { productTypeStore } = useStores();
  useEffect(() => {
    productTypeStore.fetchProductTypes();
  }, [productTypeStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "visible", headerName: "Visible", width: 90, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.visible ? (
              <Tooltip title="Hide" arrow={true}>
                <IconButton
                  onClick={() =>
                    productTypeStore.disableVisibility(params.row.id)
                  }
                >
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Make visible" arrow={true}>
                <IconButton
                  onClick={() => {
                    let rowData = params.row;
                    rowData.visible = true;
                    productTypeStore.updateProductType(rowData);
                  }}
                >
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Edit" arrow={true}>
              <IconButton
                onClick={() => productTypeStore.openPopup(params.row.id)}
              >
                <EditIcon sx={{ color: "#4f70e8" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  let display = [];
  for (let i = 0; i < productTypeStore.allProductTypes.length; i++) {
    display.push({
      id: productTypeStore.allProductTypes[i].id,
      name: productTypeStore.allProductTypes[i].code,
      visible: productTypeStore.allProductTypes[i].visible,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     name: "namesss",
  //     visible: true
  //   },
  //   {
  //     id: 1,
  //     name: "namesss",
  //     visible: true
  //   }
  // ]

  return (
    <Box className="list-Box">
      <DataGrid
        rows={display}
        columns={columns}
        pageSize={Constants.PAGE_SIZE}
        rowsPerPageOptions={[Constants.PAGE_SIZE]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default observer(ProductTypesDataGrid);
