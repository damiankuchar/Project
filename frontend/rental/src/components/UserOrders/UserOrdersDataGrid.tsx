import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/root.store";
import { IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateOpinionPopup from "./Popup/CreateOpinionPopup";
import EditIcon from "@mui/icons-material/Edit";

const UserOrdersDataGrid = () => {
  const { orderStore, orderStatusStore, opinionStore, productStore } =
    useStores();

  useEffect(() => {
    orderStore.getUserOrders();
    productStore.fetchProducts();
  }, [orderStore, orderStatusStore, productStore]);

  const columns: GridColDef[] = [
    {
      field: "lp",
      headerName: "Lp.",
      flex: 1,
    },
    {
      field: "statusCode",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "productName",
      headerName: "Product name",
      flex: 1,
    },
    {
      field: "dateStart",
      headerName: "Date start",
      flex: 1,
    },
    {
      field: "dateEnd",
      headerName: "Date end",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            <Tooltip title="Add opinion" arrow={true}>
              <IconButton onClick={() => opinionStore.openPopup(params.row)}>
                <AddIcon sx={{ color: "green" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .--Completed": {
          bgcolor: "#dcf2bc" + "!important",
          "&:hover": {
            bgcolor: "#D6ECB6" + "!important",
          },
        },
      }}
    >
      <Typography variant="h4" marginBottom="10px">
        Orders number: {orderStore.ordersCount}
      </Typography>
      <DataGrid
        getRowClassName={(params: any) => `--${params.row.statusCode}`}
        // rows={orderStore.allOrders}
        rows={orderStore.allOrders.map((order, i) => ({ lp: i + 1, ...order }))}
        loading={orderStore.loading}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />

      <CreateOpinionPopup />
    </Box>
  );
};

export default observer(UserOrdersDataGrid);
